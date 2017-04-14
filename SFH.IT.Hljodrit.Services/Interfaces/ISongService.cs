using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface ISongService
    {
        Envelope<SongDto> GetSongs(int pageSize, int pageNumber, string searchTerm, string searchType);
        SongDto GetSongById(int songId);
        void AddMusicianToSong(int songId, MusicianRegisterViewModel musician);
        void RemoveMusiciansFromSong(int songId, IEnumerable<int> musicianIds);
        void RemoveSongsFromAlbum(int albumId, IEnumerable<int> songIds);
        SongDto UpdateSongById(int songId, SongDto song);
    }
}