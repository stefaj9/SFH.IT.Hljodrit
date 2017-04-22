using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Implementations.Albums;
using SFH.IT.Hljodrit.Repositories.Implementations.Common;
using SFH.IT.Hljodrit.Repositories.Implementations.Instruments;
using SFH.IT.Hljodrit.Repositories.Implementations.Media;
using SFH.IT.Hljodrit.Repositories.Implementations.Organization;
using SFH.IT.Hljodrit.Repositories.Implementations.Persons;
using SFH.IT.Hljodrit.Repositories.Implementations.Project;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;
using SFH.IT.Hljodrit.Repositories.Implementations.Settings;
using SFH.IT.Hljodrit.Repositories.Interfaces.Instruments;
using SFH.IT.Hljodrit.Repositories.Interfaces.Media;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;
using SFH.IT.Hljodrit.Repositories.Interfaces.Settings;
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
            container.Register<IPartyMainArtistRepository, PartyMainArtistRepository>(Lifestyle.Transient);
            container.Register<IPartyContactMediumRepository, PartyContactMediumRepository>(Lifestyle.Transient);

            container.Register<IZipCodeRepository, ZipCodeRepository>(Lifestyle.Transient);
            container.Register<ICountryRepository, CountryRepository>(Lifestyle.Transient);

            container.Register<ISongRepository, SongRepository>(Lifestyle.Transient);

            container.Register<IAlbumRepository, AlbumRepository>(Lifestyle.Transient);

            container.Register<ISettingsRepository, SettingsRepository>(Lifestyle.Transient);

            container.Register<IOrganizationRepository, OrganizationRepository>(Lifestyle.Transient);
            container.Register<IOrganizationLabelRepository, OrganizationLabelRepository>(Lifestyle.Transient);
            container.Register<IOrganizationIsrcSeriesRepository, OrganizationIsrcSeriesRepository>(Lifestyle.Transient);

            container.Register<IMediaRecordingRepository, MediaRecordingRepository>(Lifestyle.Transient);
            container.Register<IRecordingPartyRepository, RecordingPartyRepository>(Lifestyle.Transient);

            container.Register<IUnitOfWork, UnitOfWork>(Lifestyle.Transient);
        }
    }
}
