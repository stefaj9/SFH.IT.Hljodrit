using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface ISongService
    {
        Envelope<SongDto> GetSongs(int pageSize, int pageNumber, string searchTerm, string searchType);
        SongExtendedDto GetSongById(int songId);
        void AddMusicianToSong(int songId, MusicianRegisterViewModel musician);
    }
}