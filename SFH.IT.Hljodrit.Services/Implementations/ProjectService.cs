using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.StaticHelperClasses;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Repositories.Interfaces.Media;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;
using SFH.IT.Hljodrit.Services.Interfaces;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectMasterRepository _projectMasterRepository;
        private readonly IProjectTrackRepository _projectTrackRepository;
        private readonly IProjectTrackArtistRepository _projectTrackArtistRepository;
        private readonly IAlbumRepository _albumRepository;
        private readonly IMediaRecordingRepository _mediaRecordingRepository;
        private readonly ISongRepository _songRepository;
        private readonly IRecordingPartyRepository _recordingPartyRepository;
        private readonly IOrganizationIsrcSeriesRepository _organizationIsrcSeriesRepository;
        private readonly IOrganizationLabelRepository _organizationLabelRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IProjectMasterRepository projectMasterRepository, IUnitOfWork unitOfWork, IProjectTrackRepository projectTrackRepository, IAlbumRepository albumRepository, IMediaRecordingRepository mediaRecordingRepository, ISongRepository songRepository, IRecordingPartyRepository recordingPartyRepository, IOrganizationLabelRepository organizationLabelRepository, IOrganizationIsrcSeriesRepository organizationIsrcSeriesRepository, IProjectTrackArtistRepository projectTrackArtistRepository)
        {
            _projectMasterRepository = projectMasterRepository;
            _unitOfWork = unitOfWork;
            _projectTrackRepository = projectTrackRepository;
            _albumRepository = albumRepository;
            _mediaRecordingRepository = mediaRecordingRepository;
            _songRepository = songRepository;
            _recordingPartyRepository = recordingPartyRepository;
            _organizationLabelRepository = organizationLabelRepository;
            _organizationIsrcSeriesRepository = organizationIsrcSeriesRepository;
            _projectTrackArtistRepository = projectTrackArtistRepository;
        }

        public Envelope<ProjectDto> GetAllProjects(int pageSize, int pageNumber, bool inWorkingState, bool recordingFinished, bool readyForPublish, bool published, string query)
        {
			if (pageSize < 25 || pageSize > 100) throw new ArgumentException("Invalid argument");

            var status = CreateStatusList(inWorkingState, recordingFinished, readyForPublish, published);

            var projects = _projectMasterRepository.GetMany(
                pm =>
                    status.Contains(pm.statuscode) &&
                    !pm.removed &&
                    (pm.mainartist.StartsWith(query) || pm.projectname.StartsWith(query) ||
                     pm.createdby.StartsWith(query))).Select(p => new ProjectDto(p)).OrderByDescending(p => p.Id);

            var totalNumber = projects.Count();

            return EnvelopeCreator.CreateEnvelope(projects.Skip((pageNumber - 1) * pageSize).Take(pageSize), pageSize, pageNumber, totalNumber);
        }

        private List<string> CreateStatusList(bool inWorkingState, bool recordingFinished, bool readyForPublish, bool published)
        {
            var statusList = new List<string>();
            if (inWorkingState) { statusList.Add(ProjectStatusEnum.ACTIVE.ToString()); }
            if (recordingFinished) { statusList.Add(ProjectStatusEnum.RECORDED.ToString()); }
            if (readyForPublish) { statusList.Add(ProjectStatusEnum.CLOSED.ToString()); }
            if (published) { statusList.Add(ProjectStatusEnum.PUBLISHED.ToString()); }

            return statusList;
        }

        public bool MarkProjectAsDeleted(int projectId)
        {
            var projectToDeleted = _projectMasterRepository.GetById(projectId);

            if (projectToDeleted != null)
            {
                projectToDeleted.removed = true;
                _unitOfWork.Commit();

                return true;
            }

            return false;
        }

        public ProjectExtendedDto GetProjectById(int projectId)
        {
            var project = _projectMasterRepository.GetById(projectId);
            return project == null ? null : new ProjectExtendedDto(project);
        }

        public IEnumerable<SongWithPerformersDto> GetProjectTracksById(int projectId)
        {
            return _projectTrackRepository.GetProjectTracksById(projectId);
        }

        public int PublishProjectById(int projectId, ProjectReviewViewModel reviewModel)
        {
            var projectToUpdate = _projectMasterRepository.GetById(projectId);
            int albumId = 0;

            if (projectToUpdate != null)
            {
                //   1.1. Update project status
                projectToUpdate.statuscode = "PUBLISHED";
                projectToUpdate.updatedby = "User";
                projectToUpdate.updatedon = DateTime.Now;
                projectToUpdate.reviewedby = "User";
                projectToUpdate.reviewedok = true;
                projectToUpdate.reviewedon = DateTime.Now;
                projectToUpdate.reviewedcomment = reviewModel.ReviewComment;

                _projectMasterRepository.Update(projectToUpdate);

                var label = _organizationLabelRepository.GetById(reviewModel.LabelId);
                var isrcSeries = _organizationIsrcSeriesRepository.GetById(reviewModel.IsrcSeriesId);
                var currentDate = DateTime.Now;

                //   1.2. Create media_product_package
                var productPackage = new media_product_package
                {
                    albumtitle = projectToUpdate.projectname,
                    albumid = 0,
                    physicallocation = "",
                    labelid = reviewModel.LabelId,
                    cataloguenumber = "",
                    releasetypecode = "0",
                    countryofproduction = label.countrycode,
                    countryofpublication = label.countrycode,
                    releasedate = currentDate,
                    packagestatusid = 4,
                    numberoftracks = _projectTrackRepository.GetMany(pt => pt.projectid == projectId).Count(),
                    formattypeid = 2,
                    comment = reviewModel.ReviewComment,
                    updatedby = "User",
                    updatedon = currentDate,
                    createdby = "User",
                    createdon = currentDate,
                    mainartistid = projectToUpdate.mainartistid
                };
                _albumRepository.Add(productPackage);

                _unitOfWork.Commit();

                albumId = productPackage.id;
                
                var projectTracks = _projectTrackRepository.GetMany(pt => pt.projectid == projectId).ToList();
                var lastUsedNumber = isrcSeries.isrc_lastusednumber + 1;

                foreach (var track in projectTracks)
                {
                    var isrc = GenerateIsrcNumber(isrcSeries.isrc_countrypart, isrcSeries.isrc_organizationpart,
                        isrcSeries.isrc_lastusedyear, lastUsedNumber++);

                    // Update track isrc as well.
                    track.isrc = isrc;
                    _projectTrackRepository.Update(track);

                    //   1.3. Create media_recording (s)
                    var recording = new media_recording
                    {
                        isrc = isrc,
                        recordingtitle = track.trackname,
                        workingtitle = track.trackname,
                        recordingcountrycode = label.countrycode,
                        statusid = 4,
                        updatedby = "User",
                        updatedon = currentDate,
                        createdby = "User",
                        createdon = currentDate,
                        recordingdate = track.createdon,
                        duration = track.duration,
                        mainartist = projectToUpdate.mainartistid,
                        markedfordeletion = false,
                        projecttrackid = track.id
                    };

                    _mediaRecordingRepository.Add(recording);

                    _unitOfWork.Commit();

                    //   1.4. Create media_product (s)
                    _songRepository.Add(new media_product
                    {
                        isrc = isrc,
                        recordingid = recording.id,
                        title = track.trackname,
                        tracknumber = track.trackorder,
                        sidenumber = 1,
                        labelid = reviewModel.LabelId,
                        cataloguenumber = "",
                        mediaproducttypeid = 1,
                        packageid = albumId,
                        releasedate = currentDate,
                        countryofproduction = label.countrycode,
                        statusid = 4,
                        updatedby = "User",
                        updatedon = currentDate,
                        createdby = "User",
                        createdon = currentDate,
                        is_deleted = false
                    });

                    var projectTrackArtists = _projectTrackArtistRepository.GetMany(p => p.projecttrackid == track.id).ToList();

                    //   1.5. Add to recording_party
                    projectTrackArtists.ForEach(pta => _recordingPartyRepository.Add(new recording_party
                    {
                        recordingid = recording.id,
                        partyrealid = pta.partyrealid,
                        rolecode = pta.rolecode,
                        instrumentcode = pta.instrumentcode,
                        artistpseudonymid = pta.artistpseudonymid,
                        updatedby = "User",
                        updatedon = currentDate,
                        createdby = "User",
                        createdon = currentDate,
                        status = 2
                    }));
                }

                isrcSeries.updatedon = currentDate;
                isrcSeries.updatedby = "User";
                isrcSeries.isrc_lastusednumber += 100;
                isrcSeries.isrc_lastusedyear = DateTime.Now.Year;

                _organizationIsrcSeriesRepository.Update(isrcSeries);

                //   1.6. Commit changes
                _unitOfWork.Commit();
            }


            return albumId;
        }

        private string GenerateIsrcNumber(string countryPart, string organizationPart, int year, int lastUsedNumber)
        {
            var yearTruncate = year.ToString().Substring(year.ToString().Length - Math.Min(2, year.ToString().Length));
            yearTruncate = yearTruncate.PadLeft(2, '0');
            var lastUsedNumberPadded = lastUsedNumber.ToString().PadLeft(5, '0');
            return $"{countryPart}-{organizationPart}-{yearTruncate}-{lastUsedNumberPadded}";
        }
    }
}
