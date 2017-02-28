using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Performers;
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

        public PersonEnvelope GetAllPerformers(int pageSize, int pageNumber)
        {
            var performers = _partyRealRepository.GetAllPersons(p => p.rolecode != ProducerRoleCode);

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

        public PersonEnvelope GetAllProducers(int pageSize, int pageNumber)
        {
            var producers = _partyRealRepository.GetAllPersons(p => p.rolecode == ProducerRoleCode);
             
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
    }
}
