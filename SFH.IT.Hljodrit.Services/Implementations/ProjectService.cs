using System;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
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

        public ProjectEnvelope GetAllProjects(int pageSize, int pageNumber, bool pending, bool resent, bool approved, string query)
        {
            decimal maxPage = _projectMasterRepository.GetProjectMasterCount(pm => !pm.removed.Value && (pm.mainartist.StartsWith(query) || pm.projectname.StartsWith(query) || pm.createdby.StartsWith(query))) / pageSize;
            var maximumPages = (int) Math.Ceiling(maxPage);
            return new ProjectEnvelope
            {
                CurrentPage = pageNumber,
                MaximumPage = maximumPages,
                Projects = _projectMasterRepository.GetMany(pm => !pm.removed.Value && (pm.mainartist.StartsWith(query) || pm.projectname.StartsWith(query) || pm.createdby.StartsWith(query))).Select(p => new ProjectDto
                {
                    Id = p.id,
                    ProjectName = p.projectname,
                    MainArtist = p.mainartist,
                    SubmissionUser = p.createdby,
                    LastModificationDate = p.updatedon
                }).OrderByDescending(p => p.Id).Skip((pageNumber - 1)*pageSize).Take(pageSize)
            };
        }
    }
}
