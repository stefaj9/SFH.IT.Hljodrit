using System;
using System.Collections.Generic;
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

        public IEnumerable<PersonDto> GetAllPerformers()
        {
           return _partyRealRepository.GetAllPerformers(p => p.rolecode != ProducerRoleCode);
        }

        public IEnumerable<PersonDto> GetAllProducers()
        {
            return _partyRealRepository.GetAllPerformers(p => p.rolecode == ProducerRoleCode);
        }
    }
}
