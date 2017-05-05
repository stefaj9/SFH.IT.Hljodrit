﻿using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Project
{
    public class ProjectStatusRepository : RepositoryBase<project_status, HljodritEntitiesDb>, IProjectStatusRepository
    {
        public ProjectStatusRepository(IDbFactory<HljodritEntitiesDb> dbFactory)
            : base(dbFactory) { }
    }
}
