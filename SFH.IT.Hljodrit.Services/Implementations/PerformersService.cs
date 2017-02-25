using System;
using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Performers;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class PerformersService : IPerformersService
    {
        private readonly IPartyRealRepository _partyRealRepository;
        
        public PerformersService(IPartyRealRepository partyRealRepository)
        {
            _partyRealRepository = partyRealRepository;
        }

        public IEnumerable<PerformerDto> GetAllPerformers()
        {
           return _partyRealRepository.GetAllPerformers();
        }
    }
}
