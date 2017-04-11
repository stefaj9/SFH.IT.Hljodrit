using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Organization
{
    public interface IOrganizationRepository : IRepository<organization_master>
    {
        IEnumerable<PublisherLabelDto> GetPublisherLabelsById(int publisherId);
        IEnumerable<LabelDto> GetLabelsByPublisherId(int publisherId);
    }
}
