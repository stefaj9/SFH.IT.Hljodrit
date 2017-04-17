using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Albums
{
    public interface IAlbumRepository : IRepository<media_product_package>
    {
        Envelope<AlbumDto> GetAlbums(int pageSize, int pageNumber, string searchTerm, Expression<Func<media_product_package, bool>> expression, string mainArtistSearchName);
        AlbumExtendedDto GetAlbumById(int id);
       // MusicianExtendedDto GetMusicianOnAlbum(int albumId, int musicianId);
        ICollection<MusiciansOnSongDto> GetMusiciansOnSong(int albumId, int songId);
        IEnumerable<AlbumDto> GetAlbumsAssociatedWithMusician(int partyRealId);
    }
}