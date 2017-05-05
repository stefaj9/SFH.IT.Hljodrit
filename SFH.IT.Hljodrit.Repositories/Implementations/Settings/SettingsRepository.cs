using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Settings;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Settings
{
	public class SettingsRepository : RepositoryBase<NLog, HljodritEntitiesDb>, ISettingsRepository
	{
		public SettingsRepository(IDbFactory<HljodritEntitiesDb> dbFactory) 
			: base(dbFactory) { }

    }
}
