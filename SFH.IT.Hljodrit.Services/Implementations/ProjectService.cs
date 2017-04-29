using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.Helpers;
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
        private readonly IProjectStatusRepository _projectStatusRepository;
        private readonly IAlbumRepository _albumRepository;
        private readonly IMediaRecordingRepository _mediaRecordingRepository;
        private readonly ISongRepository _songRepository;
        private readonly IRecordingPartyRepository _recordingPartyRepository;
        private readonly IOrganizationIsrcSeriesRepository _organizationIsrcSeriesRepository;
        private readonly IOrganizationLabelRepository _organizationLabelRepository;
        private readonly IUnitOfWork<HljodritEntities> _unitOfWork;

        public ProjectService(IProjectMasterRepository projectMasterRepository, IUnitOfWork<HljodritEntities> unitOfWork, IProjectTrackRepository projectTrackRepository, IAlbumRepository albumRepository, IMediaRecordingRepository mediaRecordingRepository, ISongRepository songRepository, IRecordingPartyRepository recordingPartyRepository, IOrganizationLabelRepository organizationLabelRepository, IOrganizationIsrcSeriesRepository organizationIsrcSeriesRepository, IProjectTrackArtistRepository projectTrackArtistRepository, IProjectStatusRepository projectStatusRepository)
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
            _projectStatusRepository = projectStatusRepository;
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
                    var isrc = IsrcHelper.GenerateIsrcNumber(isrcSeries.isrc_countrypart, isrcSeries.isrc_organizationpart,
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

        public IEnumerable<ProjectStatusDto> GetProjectStatus()
        {
            return _projectStatusRepository.GetAll().Select(ps => new ProjectStatusDto
            {
                Code = ps.statuscode,
                Name = ps.statusname
            });
        }

        public void CreateProject(ProjectCreationViewModel project, string userName)
        {
            var projectToCreate = new project_master
            {
                projectname = project.BasicInfo.ProjectName ?? "",
                mainmanagerid = null,
                // Should be the party_real associated with the submission user, in order to retrieve his projects.
                projectstartdate = DateTime.Now,
                isworkingtitle = project.BasicInfo.IsWorkingTitle,
                updatedby = userName,
                updatedon = DateTime.Now,
                createdby = userName,
                createdon = DateTime.Now,
                statuscode = project.BasicInfo.ProjectStatus,
                removed = false,
                organizationid = project.PublisherId,
                mainartist = project.BasicInfo.MainArtist,
                mainartistid = project.BasicInfo.MainArtistId
            };

            _projectMasterRepository.Add(projectToCreate);
            _unitOfWork.Commit();
            var projectId = projectToCreate.id;

            foreach (var song in project.Songs)
            {
                var songToCreate = new project_track
                {
                    projectid = projectId,
                    trackname = song.Name,
                    isworkingtitle = false,
                    updatedby = userName,
                    updatedon = DateTime.Now,
                    createdby = userName,
                    createdon = DateTime.Now,
                    isrc = song.Isrc,
                    duration = song.Length,
                    donotpublish = false,
                    trackorder = song.Number
                };
                _projectTrackRepository.Add(songToCreate);
                _unitOfWork.Commit();
                var songId = songToCreate.id;

                song.Performers.ForEach(p => _projectTrackArtistRepository.Add(new project_track_artist
                {
                    projecttrackid = songId,
                    partyrealid = p.Id,
                    rolecode = p.Role.RoleCode,
                    instrumentcode = string.IsNullOrEmpty(p.Instrument.IdCode) ? null : p.Instrument.IdCode,
                    updatedby = userName,
                    updatedon = DateTime.Now,
                    createdby = userName,
                    createdon = DateTime.Now
                }));
            }
            _unitOfWork.Commit();
        }

        public IEnumerable<ProjectDto> GetProjectsByUsername(string userName)
        {
            return _projectMasterRepository.GetMany(pm => pm.createdby == userName && !pm.removed).Select(p => new ProjectDto
            {
                Id = p.id,
                ProjectName = p.projectname,
                IsWorkingTitle = p.isworkingtitle,
                LastModificationDate = p.updatedon,
                MainArtist = p.mainartist ?? "",
                MainArtistId = p.mainartistid ?? -1,
                ProjectStatus = p.statuscode,
                ProjectStatusName = p.project_status.statusname,
                SubmissionUser = p.createdby
            });
        }
    }
}

