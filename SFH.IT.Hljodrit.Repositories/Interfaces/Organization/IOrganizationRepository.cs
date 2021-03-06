﻿using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Organization
{
    public interface IOrganizationRepository : IRepository<organization_master>
    {
        IEnumerable<PublisherIsrcSeriesDto> GetPublisherIsrcSeriesById(int publisherId);
        IEnumerable<LabelDto> GetLabelsByPublisherId(int publisherId);
        PublisherExtendedDto GetPublisherById(int publisherId);
        IEnumerable<AlbumDto> GetAlbumsByLabelId(int labelId);
        string GetPublisherCountryCodeById(int publisherId);
    }
}
