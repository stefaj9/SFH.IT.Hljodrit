using System;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.StaticHelperClasses;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Services.Interfaces;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectMasterRepository _projectMasterRepository;

        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IProjectMasterRepository projectMasterRepository, IUnitOfWork unitOfWork)
        {
            _projectMasterRepository = projectMasterRepository;
            _unitOfWork = unitOfWork;
        }

        public Envelope<ProjectDto> GetAllProjects(int pageSize, int pageNumber, bool pending, bool resent, bool approved, string query)
        {
			if (pageSize < 25 || pageSize > 100) throw new ArgumentException("Invalid argument");

            var projects = _projectMasterRepository.GetMany(
                pm =>
                    !pm.removed &&
                    (pm.mainartist.StartsWith(query) || pm.projectname.StartsWith(query) ||
                     pm.createdby.StartsWith(query))).Select(p => new ProjectDto(p)).OrderByDescending(p => p.Id);

            var totalNumber = projects.Count();

            return EnvelopeCreator.CreateEnvelope(projects.Skip((pageNumber - 1) * pageSize).Take(pageSize), pageSize, pageNumber, totalNumber);
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
    }
}
