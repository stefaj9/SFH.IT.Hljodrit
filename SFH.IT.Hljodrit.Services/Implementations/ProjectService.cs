using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Services.Interfaces;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectUserRepository _projectUserRepository;
        private readonly IProjectTrackRepository _projectTrackRepository;
        private readonly IProjectTrackArtistRepository _projectTrackArtistRepository;
        private readonly IProjectStatusRepository _projectStatus;
        private readonly IProjectMasterRepository _projectMasterRepository;

        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IProjectUserRepository userRepository, IProjectTrackRepository trackRepository,
            IProjectTrackArtistRepository trackArtistRepository,
            IProjectStatusRepository projectStatusRepository, 
            IProjectMasterRepository projectMasterRepository,
            IUnitOfWork unitOfWork)
        {
            _projectUserRepository = userRepository;
            _projectTrackRepository = trackRepository;
            _projectTrackArtistRepository = trackArtistRepository;
            _projectStatus = projectStatusRepository;
            _projectMasterRepository = projectMasterRepository;
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<ProjectDto> GetAllProjects()
        {
            return _projectMasterRepository.GetAll().Select(p => new ProjectDto
            {
                Id = p.id,
                ProjectName = p.projectname,
                MainArtist = p.mainartist,
                SubmissionUser = p.createdby,
                LastModificationDate = p.updatedon
            }).OrderByDescending(p => p.Id);
        }
    }
}
