using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.StaticHelperClasses;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Services.Interfaces;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectMasterRepository _projectMasterRepository;
        private readonly IProjectTrackRepository _projectTrackRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IProjectMasterRepository projectMasterRepository, IUnitOfWork unitOfWork, IProjectTrackRepository projectTrackRepository)
        {
            _projectMasterRepository = projectMasterRepository;
            _unitOfWork = unitOfWork;
            _projectTrackRepository = projectTrackRepository;
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
    }
}
