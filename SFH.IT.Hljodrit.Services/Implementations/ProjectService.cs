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
                    !pm.removed.Value &&
                    (pm.mainartist.StartsWith(query) || pm.projectname.StartsWith(query) ||
                     pm.createdby.StartsWith(query))).Select(p => new ProjectDto
            {
                Id = p.id,
                ProjectName = p.projectname,
                MainArtist = p.mainartist,
                SubmissionUser = p.createdby,
                LastModificationDate = p.updatedon,
                ProjectStatus = p.statuscode
            }).OrderByDescending(p => p.Id);

            var totalNumber = projects.Count();

            return EnvelopeCreator.CreateEnvelope(projects.Skip((pageNumber - 1) * pageSize).Take(pageSize), pageSize, pageNumber, totalNumber);
        }
    }
}
