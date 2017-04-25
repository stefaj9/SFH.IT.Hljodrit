using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Settings;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Settings
{
	public class SettingsRepository : RepositoryBase<NLog, HljodritEntities>, ISettingsRepository
	{
		public SettingsRepository(IDbFactory<HljodritEntities> dbFactory) 
			: base(dbFactory) { }

    }
}
