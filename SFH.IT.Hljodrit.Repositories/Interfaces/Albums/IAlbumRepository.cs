using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Albums
{
    public interface IAlbumRepository : IRepository<media_product_package>
    {
        IEnumerable<AlbumDto> GetAlbums();
        AlbumExtendedDto GetAlbumById(int id);
        IEnumerable<MusicianDto> GetMusiciansByAlbumId(int albumId);
    }
}