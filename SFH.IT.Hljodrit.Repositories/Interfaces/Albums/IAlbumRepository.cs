using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Albums
{
    public interface IAlbumRepository : IRepository<media_product_package>
    {
        Envelope<AlbumDto> GetAlbums(int pageSize, int pageNumber, string searchTerm);
        AlbumExtendedDto GetAlbumById(int id);
       // MusicianExtendedDto GetMusicianOnAlbum(int albumId, int musicianId);
        ICollection<MusiciansOnSongDto> GetMusiciansOnSong(int albumId, int songId);
    }
}