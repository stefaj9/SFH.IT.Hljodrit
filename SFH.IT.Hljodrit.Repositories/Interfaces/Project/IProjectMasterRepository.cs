using System;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Project
{
    public interface IProjectMasterRepository : IRepository<project_master>
    {
        int GetProjectMasterCount(Expression<Func<project_master, bool>> expression);
    }
}
