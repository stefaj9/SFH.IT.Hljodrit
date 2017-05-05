using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Common
{
    public class CountryRepository : RepositoryBase<common_country, HljodritEntitiesDb>, ICountryRepository
    {
        public CountryRepository(IDbFactory<HljodritEntitiesDb> dbFactory) : base(dbFactory)
        {
        }
    }
}
