using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IPersonService
    {
        Envelope<PersonDto> GetPerformers(int pageSize, int pageNumber, string searchTerm);
        Envelope<PersonDto> GetPublishers(int pageSize, int pageNumber, string searchTerm);
        Envelope<PersonDto> GetPersons(int pageSize, int pageNumber, string searchTerm);
        PersonExtendedDto GetPersonById(int personId);
        IEnumerable<RoleDto> GetPersonRoles();
        int AddPerson(PersonRegisterViewModel person);
        PersonExtendedDto UpdatePersonInfo(int personId, PersonExtendedDto updateModel);
        IEnumerable<MediaWithRoleDto> GetAllMediaAssociatedWithMusician(int partyRealId);
        IEnumerable<AlbumDto> GetAllAlbumsAssociatedWithMusician(int partyRealId);
        void DeletePersonById(int personId);
    }
}
