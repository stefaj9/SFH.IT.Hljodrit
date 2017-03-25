using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IMainArtistService
    {
        Envelope<MainArtistDto> GetMainArtistByCriteria(int pageSize, int pageNumber, string searchTerm);
        int AddMainArtist(PersonRegisterViewModel mainArtist, string user);
    }
}
