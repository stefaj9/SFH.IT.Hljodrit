using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Settings;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Settings
{
	public class SettingsRepository : RepositoryBase<NLog>, ISettingsRepository
	{
		public SettingsRepository(IDbFactory dbFactory) 
			: base(dbFactory) { }

	}
}
