using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Albums
{
    public interface IMediaRecordingRepository : IRepository<media_recording>
    {
        Envelope<MediaDto> GetAllMedia(int pageNumber, int pageSize, string searchTerm, Expression<Func<media_recording, bool>> expr);
        MediaExtendedDto GetMediaById(int mediaId);
    }
}
