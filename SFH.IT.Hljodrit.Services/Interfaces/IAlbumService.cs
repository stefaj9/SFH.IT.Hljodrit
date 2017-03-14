using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IAlbumService
    {
        IEnumerable<AlbumDto> GetAlbums();
        AlbumExtendedDto GetAlbumById(int id);
        IEnumerable<SongDto> GetAllSongs();
        SongExtendedDto GetSongById(int id);
    }
}