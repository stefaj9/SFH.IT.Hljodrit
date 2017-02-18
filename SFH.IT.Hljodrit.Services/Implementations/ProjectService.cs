using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Services.Interfaces;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    class ProjectService : IProjectService
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
            this._projectUserRepository = userRepository;
            this._projectTrackRepository = trackRepository;
            this._projectTrackArtistRepository = trackArtistRepository;
            this._projectStatus = projectStatusRepository;
            this._projectMasterRepository = projectMasterRepository;
            this._unitOfWork = unitOfWork;
        }
    }
}
