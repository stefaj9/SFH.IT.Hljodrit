using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface ISongService
    {
        Envelope<SongDto> GetSongs(int pageSize, int pageNumber, string searchTerm);

        SongExtendedDto GetSongById(int songId);
    }
}