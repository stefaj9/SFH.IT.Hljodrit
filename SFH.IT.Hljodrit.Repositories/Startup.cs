﻿using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Implementations.Project;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;
using SimpleInjector;

namespace SFH.IT.Hljodrit.Repositories
{
    public static class Startup
    {
        public static void RegisterComponents(Container container)
        {
            container.Register<IDbFactory, DbFactory>(Lifestyle.Scoped);

            container.Register<IProjectMasterRepository, ProjectMasterRepository>(Lifestyle.Transient);
            container.Register<IProjectStatusRepository, ProjectStatusRepository>(Lifestyle.Transient);
            container.Register<IProjectTrackArtistRepository, ProjectTrackArtistRepository>(Lifestyle.Transient);
            container.Register<IProjectTrackRepository, ProjectTrackRepository>(Lifestyle.Transient);
            container.Register<IProjectUserRepository, ProjectUserRepository>(Lifestyle.Transient);
            container.Register<IUnitOfWork, UnitOfWork>(Lifestyle.Transient);
        }
    }
}