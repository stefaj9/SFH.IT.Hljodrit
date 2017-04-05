using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Albums
{
    public interface ISongRepository: IRepository<media_product>
    {
        Envelope<SongDto> GetSongs(int pageSize, int pageNumber, string searchTerm, Expression<Func<SongDto, bool>> expr);
        IEnumerable<SongDto> GetSongsByAlbumId(int albumId);
        SongExtendedDto GetSongOnAlbum(int albumId, int songId);
    }
}
