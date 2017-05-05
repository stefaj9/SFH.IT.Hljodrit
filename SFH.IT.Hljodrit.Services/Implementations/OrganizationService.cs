using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;
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
        private readonly IOrganizationIsrcSeriesRepository _organizationIsrcSeriesRepository;
        private readonly IUnitOfWork<HljodritEntitiesDb> _unitOfWork;

        public OrganizationService(IOrganizationRepository organizationRepository, IOrganizationLabelRepository organizationLabelRepository, 
            IOrganizationIsrcSeriesRepository organizationIsrcSeriesRepository, IUnitOfWork<HljodritEntitiesDb> unitOfWork)
        {
            _organizationRepository = organizationRepository;
            _organizationLabelRepository = organizationLabelRepository;
            _organizationIsrcSeriesRepository = organizationIsrcSeriesRepository;
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
                Name = o.name,
                Address = o.address1,
                MainContactName = String.IsNullOrEmpty(o.maincontact) ? "Ekki skráð" :o.maincontact,
                MainContactEmail = String.IsNullOrEmpty(o.maincontactemail) ? "Ekki skráð" : o.maincontactemail
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

        public PublisherExtendedDto GetPublisherById(int publisherId)
        {
            var publisher = _organizationRepository.GetPublisherById(publisherId);
            return publisher;
        }

        public PublisherExtendedDto UpdatePublisherInfo(int publisherId, PublisherViewModel updatedPublisher)
        {
            var publisherEntity = _organizationRepository.Get(p => p.id == publisherId);
            publisherEntity.address1 = updatedPublisher.Address;
            publisherEntity.name = updatedPublisher.Name;
            publisherEntity.uniqueidentifier = updatedPublisher.SSN;
            publisherEntity.zipcode = updatedPublisher.ZipCode;
            publisherEntity.maincontact = updatedPublisher.MainContactName;
            publisherEntity.maincontactemail = updatedPublisher.MainContactEmail;
            publisherEntity.maincontacttel = updatedPublisher.MainContactPhoneNumber;

            _organizationRepository.Update(publisherEntity);

            _unitOfWork.Commit();

            return GetPublisherById(publisherId);
        }

        public PublisherIsrcSeriesDto AddIsrcByPublisherId(int publisherId, PublisherIsrcViewModel newIsrcSeries)
        {
            var newIsrcSeriesEntry = new organization_isrc_series
            {
                createdby = "User",
                updatedby = "User",
                createdon = DateTime.Now,
                updatedon = DateTime.Now,
                isactive = true,
                isrc_countrypart = _organizationRepository.GetPublisherCountryCodeById(publisherId),
                isrc_lastusednumber = 0,
                isrc_lastusedyear = DateTime.Now.Year,
                isrc_organizationpart = newIsrcSeries.IsrcOrganizationPart,
                organizationid = newIsrcSeries.OrganizationId,
                purposelabel = "Almenn útgáfa",
            };

            _organizationIsrcSeriesRepository.Add(newIsrcSeriesEntry);
            _unitOfWork.Commit();

            var createdIsrcSeries = _organizationIsrcSeriesRepository.GetAll().OrderByDescending(i => i.id).First();

            return new PublisherIsrcSeriesDto
            {
                IsrcSeriesId = createdIsrcSeries.id,
                IsrcCountryPart = createdIsrcSeries.isrc_countrypart,
                IsrcOrganizationPart = createdIsrcSeries.isrc_organizationpart,
                LastIsrcNumber = createdIsrcSeries.isrc_lastusednumber,
                OrganizationId = createdIsrcSeries.organizationid,
                PurposeLabel = createdIsrcSeries.purposelabel
            };
        }

        public PublisherExtendedDto CreatePublisher(PublisherViewModel publisher)
        {
            var newPublisher = new organization_master
            {
                address1 = publisher.Address,
                countrycode = 354,
                createdby = "User",
                updatedby = "User",
                createdon = DateTime.Now,
                updatedon = DateTime.Now,
                isactive = true,
                name = publisher.Name,
                uniqueidentifier = publisher.SSN,
                zipcode = publisher.ZipCode,
                telephone = publisher.PhoneNumber,
                maincontact = publisher.MainContactName,
                maincontactemail = publisher.MainContactEmail,
                maincontacttel = publisher.MainContactPhoneNumber,
                website = publisher.Website,
                visibletopublic = true,
                organizationtype = 1
            };

            _organizationRepository.Add(newPublisher);
            _unitOfWork.Commit();

            var createdPublisher = _organizationRepository.GetAll().OrderByDescending(i => i.id).First();

            //return _organizationRepository.GetPublisherById(createdPublisher.id);

            return new PublisherExtendedDto
            {
                Address = createdPublisher.address1,
                City = publisher.City,
                Id = createdPublisher.id,
                MainContactName = createdPublisher.maincontact,
                MainContactEmail = createdPublisher.maincontactemail,
                MainContactPhoneNumber = createdPublisher.maincontacttel,
                Name = createdPublisher.name,
                OrganizationType = "Almenn útgáfa",
                Website = createdPublisher.website,
                SSN = createdPublisher.uniqueidentifier,
                ZipCode = createdPublisher.zipcode
            };
        }
    }
}
