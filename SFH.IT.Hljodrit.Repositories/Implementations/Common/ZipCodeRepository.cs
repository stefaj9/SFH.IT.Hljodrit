using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Common
{
    public class ZipCodeRepository : RepositoryBase<common_zipcodes, HljodritEntitiesDb>, IZipCodeRepository
    {
        public ZipCodeRepository(IDbFactory<HljodritEntitiesDb> dbFactory) : base(dbFactory)
        {
        }
    }
}
