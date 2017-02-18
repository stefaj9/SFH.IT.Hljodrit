using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Project
{
    class ProjectStatusRepository : RepositoryBase<project_status>, IProjectStatusRepository
    {
        public ProjectStatusRepository(IDbFactory dbFactory)
            : base(dbFactory) { }
    }
}
