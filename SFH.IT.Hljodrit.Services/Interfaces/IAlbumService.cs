using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IAlbumService
    {
        Envelope<AlbumDto> GetAlbums(int pageSize, int pageNumber, string searchTerm, string searchFilter);
        AlbumExtendedDto GetAlbumById(int id);
        IEnumerable<SongDto> GetSongsByAlbumId(int albumId);
        AlbumExtendedDto UpdateAlbumInfo(int albumId, AlbumViewModel updatedAlbum);
        SongExtendedDto GetSongOnAlbum(int albumId, int songId);
        //MusicianExtendedDto GetMusicianOnAlbum(int albumId, int musicianId);
        ICollection<MusiciansOnSongDto> GetMusiciansOnSong(int albumId, int songId);
    }
}