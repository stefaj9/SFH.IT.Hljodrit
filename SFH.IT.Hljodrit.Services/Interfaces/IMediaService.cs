using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IMediaService
    {
        Envelope<MediaDto> GetAllMedia(int pageNumber, int pageSize, string searchTerm, string searchType);
        MediaExtendedDto GetMediaById(int mediaId);
    }
}
