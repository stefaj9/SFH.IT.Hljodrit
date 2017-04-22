using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Organization
{
    public class OrganizationIsrcSeriesRepository : RepositoryBase<organization_isrc_series>, IOrganizationIsrcSeriesRepository
    {
        public OrganizationIsrcSeriesRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
