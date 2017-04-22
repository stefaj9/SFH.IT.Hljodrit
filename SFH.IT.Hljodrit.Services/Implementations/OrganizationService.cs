using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class OrganizationService : IOrganizationService
    {
        private readonly IOrganizationRepository _organizationRepository;
        private readonly IOrganizationLabelRepository _organizationLabelRepository;
        private readonly IUnitOfWork _unitOfWork;

        public OrganizationService(IOrganizationRepository organizationRepository, IOrganizationLabelRepository organizationLabelRepository, IUnitOfWork unitOfWork)
        {
            _organizationRepository = organizationRepository;
            _organizationLabelRepository = organizationLabelRepository;
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<PublisherIsrcSeriesDto> GetPublisherIsrcSeriesById(int publisherId)
        {
            return _organizationRepository.GetPublisherIsrcSeriesById(publisherId);
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

        public LabelDto AddLabelByPublisherId(int publisherId, LabelDto label)
        {
            var organizationLabel = new organization_labels
            {
                countrycode = 354,
                organizationid = publisherId,
                labelname = label.LabelName,
                dateissued = DateTime.Now,
                rights_world = true,
                rights_europe = true,
                rights_ownterritory = true,
                updatedby = "User",
                updatedon = DateTime.Now,
                createdby = "User",
                createdon = DateTime.Now
            };

            _organizationLabelRepository.Add(organizationLabel);
            _unitOfWork.Commit();

            return new LabelDto
            {
                LabelId = organizationLabel.id,
                LabelName = organizationLabel.labelname,
                OrganizationId = organizationLabel.organizationid
            };
        }
    }
}
