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

        private PersonEnvelope CreateEnvelope(IEnumerable<PersonDto> persons, int pageSize, int pageNumber)
        {
            persons = persons.ToList();
            decimal maxPage = persons.Count() / (decimal)pageSize;
            var maximumPages = (int)Math.Ceiling(maxPage);

            var personList = persons.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            return new PersonEnvelope()
            {
                MaximumPage = maximumPages,
                CurrentPage = pageNumber,
                Persons = personList
            };
        }

        public PersonEnvelope GetPerformers(int pageSize, int pageNumber, string searchTerm = null)
        {
            var performers = _partyRealRepository.GetPersons(p => p.rolecode != ProducerRoleCode, searchTerm).OrderBy(person => person.Fullname);
            var performersEnvelope =  CreateEnvelope(performers, pageSize, pageNumber);

            return performersEnvelope;
        }

        public PersonEnvelope GetProducers(int pageSize, int pageNumber, string searchTerm = null)
        {
            var producers = _partyRealRepository.GetPersons(p => p.rolecode == ProducerRoleCode, searchTerm).OrderBy(person => person.Fullname);
            var producersEnvelope = CreateEnvelope(producers, pageSize, pageNumber);

            return producersEnvelope;
        }

        public PersonEnvelope GetPersons(int pageSize, int pageNumber, string searchTerm = null)
        {
            var persons = _partyRealRepository.GetPersons(searchTerm);
            var personEnvelope = CreateEnvelope(persons, pageSize, pageNumber);
            
            return personEnvelope; 
        }

        public PersonDto GetPersonById(int personId)
        {
            return _partyRealRepository.GetPersonById(personId);    
        }
    }
}
