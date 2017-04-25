using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Project
{
    public class ProjectUserRepository : RepositoryBase<project_user, HljodritEntities>, IProjectUserRepository
    {
        public ProjectUserRepository(IDbFactory<HljodritEntities> dbFactory)
            : base(dbFactory) { }
    }
}
