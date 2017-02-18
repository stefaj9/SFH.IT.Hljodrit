using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Project
{
    class ProjectMasterRepository : RepositoryBase<project_master>, IProjectMasterRepository
    {
        public ProjectMasterRepository(IDbFactory dbFactory)
            : base(dbFactory) { }
    }
}
