using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class MainArtistService : IMainArtistService
    {
        private readonly IPartyMainArtistRepository _partyMainArtistRepository;

        public MainArtistService(IPartyMainArtistRepository partyMainArtistRepository)
        {
            _partyMainArtistRepository = partyMainArtistRepository;
        }

        public Envelope<MainArtistDto> GetMainArtistByCriteria(int pageSize, int pageNumber, string searchTerm)
        {
            var mainArtists = _partyMainArtistRepository.GetAll().ToList();
            var maxPages = mainArtists.Count / pageSize;
            var mainArtistsFiltered =
                mainArtists.Skip((pageNumber - 1) * pageSize).Take(pageNumber).Select(ma => new MainArtistDto
                {
                    Id = ma.id,
                    Name = ma.artistname,
                    PartyRealId = ma.partyrealid
                });

            return new Envelope<MainArtistDto>
            {
                CurrentPage = pageNumber,
                MaximumPage = maxPages,
                Objects = mainArtistsFiltered
            };
        }
    }
}
