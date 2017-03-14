using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Organization
{
    public class OrganizationRepository : RepositoryBase<organization_master>, IOrganizationRepository
    {
        public OrganizationRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public IEnumerable<PublisherLabelDto> GetPublisherLabelsById(int publisherId)
        {
            return DbContext.organization_master.Join(DbContext.organization_labels, master => master.id,
                    labels => labels.organizationid, (master, labels) => labels)
                .Where(l => l.organizationid == publisherId)
                .Select(l => new PublisherLabelDto
                {
                    LabelId = l.id,
                    LabelName = l.labelname,
                    OrganizationId = l.organizationid
                });
        }
    }
}
