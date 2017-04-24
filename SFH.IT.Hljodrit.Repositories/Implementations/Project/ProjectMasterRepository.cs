using System;
using System.Linq;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Project
{
    public class ProjectMasterRepository : RepositoryBase<project_master, HljodritEntities>, IProjectMasterRepository
    {
        public ProjectMasterRepository(IDbFactory<HljodritEntities> dbFactory)
            : base(dbFactory) { }

        public int GetProjectMasterCount(Expression<Func<project_master, bool>> expression)
        {
            return DbContext.project_master.Count(expression);
        }
    }
}
