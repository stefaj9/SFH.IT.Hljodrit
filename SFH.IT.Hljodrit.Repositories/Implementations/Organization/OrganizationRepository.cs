﻿using System.Collections.Generic;
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

        public IEnumerable<PublisherIsrcSeriesDto> GetPublisherIsrcSeriesById(int publisherId)
        {
            return DbContext.organization_master.Where(o => o.id == publisherId)
                .Join(DbContext.organization_isrc_series, master => master.id, series => series.organizationid,
                    (master, series) => new PublisherIsrcSeriesDto
                    {
                        IsrcSeriesId = series.id,
                        IsrcOrganizationPart = series.isrc_organizationpart,
                        OrganizationId = master.id,
                        PurposeLabel = series.purposelabel,
                        LastIsrcNumber = series.isrc_lastusednumber
                    });
        }

        public IEnumerable<LabelDto> GetLabelsByPublisherId(int publisherId)
        {
            var labels = from publisher in DbContext.organization_labels
                where publisher.organizationid == publisherId
                select new LabelDto
                {
                    OrganizationId = publisher.organizationid,
                    LabelId = publisher.id,
                    LabelName = publisher.labelname
                };

            return labels.ToList();
        }
    }
}
