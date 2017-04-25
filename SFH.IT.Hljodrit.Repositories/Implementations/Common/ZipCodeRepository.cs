using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Common
{
    public class ZipCodeRepository : RepositoryBase<common_zipcodes, HljodritEntities>, IZipCodeRepository
    {
        public ZipCodeRepository(IDbFactory<HljodritEntities> dbFactory) : base(dbFactory)
        {
        }
    }
}
