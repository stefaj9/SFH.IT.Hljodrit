using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class OrganizationService : IOrganizationService
    {
        private readonly IOrganizationRepository _organizationRepository;

        public OrganizationService(IOrganizationRepository organizationRepository)
        {
            _organizationRepository = organizationRepository;
        }

        public IEnumerable<PublisherLabelDto> GetPublisherLabelsById(int publisherId)
        {
            return _organizationRepository.GetPublisherLabelsById(publisherId);
        }

        public Envelope<PublisherDto> GetAllPublishers(int pageSize, int pageNumber, string searchTerm)
        {
            var organizationsAll = _organizationRepository.GetMany(o => o.name.Contains(searchTerm)).ToList();
            var organizations = organizationsAll.Skip((pageNumber - 1) * pageSize).Take(pageSize).Select(o => new PublisherDto
            {
                Id = o.id,
                Name = o.name
            });

            return new Envelope<PublisherDto>
            {
                CurrentPage = pageNumber,
                MaximumPage = organizationsAll.Count / pageSize,
                Objects = organizations
            };
        }

        public IEnumerable<LabelDto> GetLabelsByPublisherId(int publisherId)
        {
            var labels = _organizationRepository.GetLabelsByPublisherId(publisherId);
            return labels;
        }
    }
}
