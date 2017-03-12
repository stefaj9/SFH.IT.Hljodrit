using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IPersonService
    {
        PersonEnvelope GetPerformers(int pageSize, int pageNumber, string searchTerm);
        PersonEnvelope GetProducers(int pageSize, int pageNumber, string searchTerm);
        PersonEnvelope GetVipUsers(int pageSize, int pageNumber);
        PersonEnvelope GetFilteredPersons(int pageSize, int pageNumber, bool performers, bool producers, bool vip);
        PersonEnvelope GetPersons(int pageSize, int pageNumber, string searchTerm);
        PersonExtendedDto GetPersonById(int personId);
        IEnumerable<RoleDto> GetPersonRoles();

    }
}
