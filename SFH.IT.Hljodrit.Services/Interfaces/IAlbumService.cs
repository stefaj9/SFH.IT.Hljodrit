using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IAlbumService
    {
        IEnumerable<AlbumDto> GetAlbums();
        AlbumExtendedDto GetAlbumById(int id);
        IEnumerable<SongDto> GetSongsByAlbumId(int albumId);
        SongExtendedDto GetSongOnAlbum(int albumId, int songId);
        //MusicianExtendedDto GetMusicianOnAlbum(int albumId, int musicianId);
        ICollection<MusiciansOnSongDto> GetMusiciansOnSong(int albumId, int songId);
    }
}