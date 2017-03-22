using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IMainArtistService
    {
        Envelope<MainArtistDto> GetMainArtistByCriteria(int pageSize, int pageNumber, string searchTerm);
    }
}
