using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface ISongService
    {
        IEnumerable<SongDto> GetSongs();

        SongExtendedDto GetSongById(int songId);
    }
}