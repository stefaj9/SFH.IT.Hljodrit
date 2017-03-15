using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class SongService : ISongService
    {
        private readonly ISongRepository _songRepository;

        public SongService(ISongRepository songRepository)
        {
            _songRepository = songRepository;
        }

        public IEnumerable<SongDto> GetSongs()
        {
            return _songRepository.GetAll().Select(song => new SongDto
            {
                Id = song.id,
                Title = song.title,
                TrackNumber = song.tracknumber ?? -1
            });
        }

        public SongExtendedDto GetSongById(int id)
        {
            var song = _songRepository.GetById(id);

            return new SongExtendedDto(song);
        }
    }
}