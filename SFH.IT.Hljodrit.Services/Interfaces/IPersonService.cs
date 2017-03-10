using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IPersonService
    {
        PersonEnvelope GetPerformers(int pageSize, int pageNumber, string searchTerm);
        PersonEnvelope GetProducers(int pageSize, int pageNumber, string searchTerm);
        PersonEnvelope GetPersons(int pageSize, int pageNumber, string searchTerm);
        PersonExtendedDto GetPersonById(int personId);
        IEnumerable<RoleDto> GetPersonRoles();
        int AddPerson(PersonRegisterViewModel person);
    }
}
