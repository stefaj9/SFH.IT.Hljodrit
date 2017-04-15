using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Media
{
    public interface IRecordingPartyRepository : IRepository<recording_party>
    {
        IEnumerable<MediaWithRoleDto> GetAllMediaAssociatedWithMusician(int partyRealId, int pageNumber, int pageSize, string searchTerm);
    }
}
