using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IPersonService
    {
        PersonEnvelope GetAllPerformers(int pageSize, int pageNumber, string searchTerm);
        PersonEnvelope GetAllProducers(int pageSize, int pageNumber, string searchTerm);
        PersonEnvelope GetAllPersons(int pageSize, int pageNumber, string searchTerm);
        PersonDto GetPersonById(int personId);
        IEnumerable<RoleDto> GetPersonRoles();
    }
}
