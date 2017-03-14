using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IOrganizationService
    {
        IEnumerable<PublisherLabelDto> GetPublisherLabelsById(int publisherId);
    }
}
