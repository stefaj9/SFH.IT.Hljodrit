﻿using SFH.IT.Hljodrit.Services.Implementations;
using SFH.IT.Hljodrit.Services.Interfaces;
using SimpleInjector;

namespace SFH.IT.Hljodrit.Services
{
    public static class Startup
    {
        public static void RegisterComponents(Container container)
        {
            Repositories.Startup.RegisterComponents(container);

            container.Register<IProjectService, ProjectService>(Lifestyle.Transient);
            container.Register<IInstrumentService, InstrumentService>(Lifestyle.Transient);
            container.Register<IPersonService, PersonService>(Lifestyle.Transient);
            container.Register<ICommonService, CommonService>(Lifestyle.Transient);
            container.Register<ISongService, SongService>(Lifestyle.Transient);
            container.Register<IAlbumService, AlbumService>(Lifestyle.Transient);
            container.Register<ISettingsService, SettingsService>(Lifestyle.Transient);
            container.Register<IOrganizationService, OrganizationService>(Lifestyle.Transient);
            container.Register<IMainArtistService, MainArtistService>(Lifestyle.Transient);
            container.Register<IMediaService, MediaService>(Lifestyle.Transient);
            container.Register<IUserService, UserService>(Lifestyle.Transient);
        }
    }
}
