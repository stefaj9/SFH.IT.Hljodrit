using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class PersonService : IPersonService
    {
        private readonly IPartyRealRepository _partyRealRepository;
        private readonly IPartyRoleRepository _partyRoleRepository;
        private readonly IZipCodeRepository _zipCodeRepository;
        private readonly ICountryRepository _countryRepository;
        private readonly IUnitOfWork _unitOfWork;
        private const string ProducerRoleCode = "PRO";

        public PersonService(IPartyRealRepository partyRealRepository, IPartyRoleRepository partyRoleRepository, IUnitOfWork unitOfWork, ICountryRepository countryRepository, IZipCodeRepository zipCodeRepository)
        {
            _partyRoleRepository = partyRoleRepository;
            _unitOfWork = unitOfWork;
            _countryRepository = countryRepository;
            _zipCodeRepository = zipCodeRepository;
            _partyRealRepository = partyRealRepository;
        }

        private Envelope<PersonDto> CreateEnvelope(IEnumerable<PersonDto> persons, int pageSize, int pageNumber)
        {
            persons = persons.ToList();
            decimal maxPage = persons.Count() / (decimal)pageSize;

            var maximumPages = (int)Math.Ceiling(maxPage);

            var personList = persons.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            return new Envelope<PersonDto>
            {
                CurrentPage = pageNumber,
                MaximumPage = maximumPages,
                Objects = personList
            };
        }

        public Envelope<PersonDto> GetPerformers(int pageSize, int pageNumber, string searchTerm = null)
        {
            var performers = _partyRealRepository.GetPersons(p => p.rolecode != ProducerRoleCode, searchTerm).OrderBy(person => person.Fullname);
			if (pageSize < 25 || pageSize > 100) throw new ArgumentException("Invalid argument");
             
            var performersEnvelope =  CreateEnvelope(performers, pageSize, pageNumber);

            return performersEnvelope;
        }

        public Envelope<PersonDto> GetPublishers(int pageSize, int pageNumber, string searchTerm = null)
        {
            var producers = _partyRealRepository.GetPersons(p => p.rolecode == ProducerRoleCode, searchTerm).OrderBy(person => person.Fullname);

			if (pageSize < 25 || pageSize > 100) throw new ArgumentException("Invalid argument");

            var producersEnvelope = CreateEnvelope(producers, pageSize, pageNumber);

            return producersEnvelope;
        }

        public Envelope<PersonDto> GetPersons(int pageSize, int pageNumber, string searchTerm = null)
        {
            var persons = _partyRealRepository.GetPersons(searchTerm);
			if (pageSize < 25 || pageSize > 100) throw new ArgumentException("Invalid argument");

            var personEnvelope = CreateEnvelope(persons, pageSize, pageNumber);
            
            return personEnvelope; 
        }

        public PersonExtendedDto GetPersonById(int personId)
        {
            var person = _partyRealRepository.GetById(personId);

            return person == null ? new PersonExtendedDto() : new PersonExtendedDto(person, person.party_contactmedium);
        }

        public IEnumerable<RoleDto> GetPersonRoles()
        {
            return _partyRoleRepository.GetMany(pr => pr.active == true).Select(pr => new RoleDto
            {
                RoleCode = pr.rolecode,
                RoleName = pr.rolename_is
            }).OrderBy(r => r.RoleName);
        }

        public int AddPerson(PersonRegisterViewModel person)
        {
            var area = _zipCodeRepository.Get(zc => zc.zipcode == person.Zipcode).areaname;
            var entity = new party_real
            {
                fullname = person.Name,
                postaladdressline1 = person.Address,
                countrycode = _countryRepository.GetById(person.NumericCountryIsoCode).twoletterisocode,
                zipcode = person.Zipcode,
                uniqueidentifier = person.Ssn.Replace("-", ""),
                area = area,
                city = area,
                deceased = person.IsDeceased,
                updatedon = DateTime.Now
            };
            _partyRealRepository.Add(entity);
            _unitOfWork.Commit();

            return entity.id;
        }
    }
}
