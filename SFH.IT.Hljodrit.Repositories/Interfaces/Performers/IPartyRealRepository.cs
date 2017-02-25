using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Performers
{
    public interface IPartyRealRepository : IRepository<party_real>
    {
        IEnumerable<PerformerDto> GetAllPerformers();
    }


}




