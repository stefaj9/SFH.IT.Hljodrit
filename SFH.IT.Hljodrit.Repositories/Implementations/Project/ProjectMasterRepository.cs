using System.Linq;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Project
{
    public class ProjectMasterRepository : RepositoryBase<project_master>, IProjectMasterRepository
    {
        public ProjectMasterRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

        public int GetProjectMasterCount()
        {
            return DbContext.project_master.Count();
        }
    }
}
