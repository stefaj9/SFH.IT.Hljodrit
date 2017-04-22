using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Organization
{
    public class OrganizationLabelRepository : RepositoryBase<organization_labels>, IOrganizationLabelRepository
    {
        public OrganizationLabelRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
