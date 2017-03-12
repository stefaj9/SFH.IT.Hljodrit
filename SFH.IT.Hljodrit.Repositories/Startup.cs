using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Implementations.Albums;
using SFH.IT.Hljodrit.Repositories.Implementations.Common;
using SFH.IT.Hljodrit.Repositories.Implementations.Instruments;
using SFH.IT.Hljodrit.Repositories.Implementations.Persons;
using SFH.IT.Hljodrit.Repositories.Implementations.Project;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;
using SFH.IT.Hljodrit.Repositories.Interfaces.Instruments;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
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
            container.Register<IInstrumentRepository, InstrumentRepository>(Lifestyle.Transient);
            container.Register<IPartyRealRepository, PartyRealRepository>(Lifestyle.Transient);
            container.Register<IPartyRoleRepository, PartyRoleRepository>(Lifestyle.Transient);
            container.Register<IZipCodeRepository, ZipCodeRepository>(Lifestyle.Transient);
            container.Register<ICountryRepository, CountryRepository>(Lifestyle.Transient);
            container.Register<IAlbumRepository, AlbumRepository>(Lifestyle.Transient);
            container.Register<IUnitOfWork, UnitOfWork>(Lifestyle.Transient);
        }
    }
}
