using System.Collections.Generic;
using SFH.IT.Hljodrit.Common;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IOrganizationService
    {
        IEnumerable<PublisherIsrcSeriesDto> GetPublisherIsrcSeriesById(int publisherId);

        IEnumerable<LabelDto> GetLabelsByPublisherId(int publisherId );
        Envelope<PublisherDto> GetAllPublishers(int pageSize, int pageNumber, string searchTerm);
        LabelDto AddLabelByPublisherId(int publisherId, LabelDto label);
        PublisherExtendedDto GetPublisherById(int publisherId);
        PublisherExtendedDto UpdatePublisherInfo(int publisherId, PublisherViewModel updatedPublisher);
        PublisherIsrcSeriesDto AddIsrcByPublisherId(int publisherId, PublisherIsrcViewModel newIsrcSeries);
    }
}
