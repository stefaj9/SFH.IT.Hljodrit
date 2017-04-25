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
    public class MediaRecordingRepository : RepositoryBase<media_recording, HljodritEntities>, IMediaRecordingRepository
    {
        public MediaRecordingRepository(IDbFactory<HljodritEntities> dbFactory) : base(dbFactory)
        {
        }

        public Envelope<MediaDto> GetAllMedia(int pageNumber, int pageSize, string searchTerm, Expression<Func<media_recording, bool>> expr)
        {
            var mediaList = DbContext.media_recording
                .Where(expr)
                .ToList()
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(media => new MediaDto
                {
                    Id = media.id,
                    Title = media.recordingtitle,
                    Isrc = media.isrc,
                    MainArtist = media.party_mainartist == null ? "" : media.party_mainartist.artistname,
                    Duration = media.duration,
                    ReleaseDate = media.recordingdate,
                    TotalMusicians = 0 
                    // This subquery slows it down significantly...
                    /*(from x in DbContext.recording_party
                                       where x.recordingid == media.id
                                       select x).GroupBy(x => x.partyrealid).Count()*/
                });

            var totalSongs = DbContext.media_recording.Where(expr).Count();

            var result = EnvelopeCreator.CreateEnvelope(mediaList,
                pageSize, 
                pageNumber, 
                totalSongs);

            return result;
        }

        public MediaExtendedDto GetMediaById(int mediaId)
        {
            var media = DbContext.media_recording
                .Where(x => x.id == mediaId)
                .Select(m => new MediaExtendedDto
                {
                    Id = m.id,
                    Title = m.recordingtitle,
                    Isrc = m.isrc,
                    MainArtist = m.party_mainartist == null ? "" : m.party_mainartist.artistname,
                    Duration = m.duration,
                    ReleaseDate = m.recordingdate,
                    TotalMusicians = (from x in DbContext.recording_party
                        where x.recordingid == m.id
                        select x).GroupBy(x => x.partyrealid).Count()
                }).SingleOrDefault();

            return media;
        }
    }
}
