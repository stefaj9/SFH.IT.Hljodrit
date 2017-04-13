using System;
using System.Linq;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.StaticHelperClasses;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Albums
{
    public class MediaRecordingRepository : RepositoryBase<media_recording>, IMediaRecordingRepository
    {
        public MediaRecordingRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public Envelope<MediaDto> GetAllMedia(int pageNumber, int pageSize, string searchTerm, Expression<Func<MediaDto, bool>> expr)
        {
            var mediaList = DbContext.media_recording.Select(media => new MediaDto
            {
                Id = media.id,
                Title = media.recordingtitle,
                Isrc = media.isrc,
                MainArtist = media.party_mainartist.artistname,
                Duration = media.duration,
                ReleaseDate = media.recordingdate
            }).Where(expr).OrderBy(media => media.Title).Skip((pageNumber - 1) * pageSize).Take(pageSize);

            var totalSongs = mediaList.Count();
            var result = EnvelopeCreator.CreateEnvelope(mediaList, pageSize, pageNumber, totalSongs);

            return result;
        }
    }
}
