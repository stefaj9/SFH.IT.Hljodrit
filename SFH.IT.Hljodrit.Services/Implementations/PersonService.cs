using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class PersonService : IPersonService
    {
        private readonly IPartyRealRepository _partyRealRepository;
        private const string ProducerRoleCode = "PRO";

        public PersonService(IPartyRealRepository partyRealRepository)
        {
            _partyRealRepository = partyRealRepository;
        }

        public PersonEnvelope GetAllPerformers(int pageSize, int pageNumber, string searchTerm)
        {
            var performers = _partyRealRepository.GetAllPersons(p => p.rolecode != ProducerRoleCode).OrderBy(person => person.Fullname).ToList();

            decimal maxPage = performers.Count() / pageSize;
            var maximumPages = (int)Math.Ceiling(maxPage);

            var performerList = performers.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            return new PersonEnvelope
            {
                MaximumPage = maximumPages,
                CurrentPage = pageNumber,
                Persons = performerList
            };
        }

        public PersonEnvelope GetAllProducers(int pageSize, int pageNumber, string searchTerm)
        {
            var producers = _partyRealRepository.GetAllPersons(p => p.rolecode == ProducerRoleCode).OrderBy(person => person.Fullname).ToList();
             
            decimal maxPage = producers.Count() / pageSize;
            var maximumPages = (int)Math.Ceiling(maxPage);

            var producerList = producers.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            return new PersonEnvelope
            {
                MaximumPage = maximumPages,
                CurrentPage = pageNumber,
                Persons = producerList
            };
        }

        public PersonEnvelope GetAllPersons(int pageSize, int pageNumber, string searchTerm)
        {
            IEnumerable<PersonDto> persons;

            if (searchTerm != "")
            {
                persons = _partyRealRepository.GetAllPersons(searchTerm).ToList();
            }
            else
            {
                persons = _partyRealRepository.GetAll().Select(person => new PersonDto()
                {
                    Id = person.id,
                    Fullname = person.fullname,
                    PostalAddressLine1 = person.postaladdressline1,
                    ZipCode = person.zipcode,
                    Area = person.area
                }).ToList().OrderBy(person => person.Fullname);
            }
            
            decimal maxPage = persons.Count() / pageSize;
            var maximumPages = (int)Math.Ceiling(maxPage);

            var personList = persons.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            return new PersonEnvelope()
            {
                MaximumPage = maximumPages,
                CurrentPage = pageNumber,
                Persons = personList
            };
        }
    }
}
