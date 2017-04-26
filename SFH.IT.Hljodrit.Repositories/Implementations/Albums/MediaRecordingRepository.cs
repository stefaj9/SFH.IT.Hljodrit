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
                                      select x).GroupBy(x => x.partyrealid)
                        .Count(),
                    Publisher = (from x in DbContext.media_product
                                 where x.recordingid == mediaId
                                 join label in DbContext.organization_labels
                                 on x.labelid equals label.id
                                 join publisher in DbContext.organization_master
                                 on label.organizationid equals publisher.id
                                 select new PublisherDto
                                 {
                                     Id = publisher.id,
                                     Name = publisher.name
                                 }).FirstOrDefault(),
                    Label = (from x in DbContext.media_product
                             where x.recordingid == mediaId
                             join label in DbContext.organization_labels
                             on x.labelid equals label.id
                             select new LabelDto
                             {
                                 LabelId = label.id,
                                 LabelName = label.labelname,
                                 OrganizationId = label.organizationid
                             }).FirstOrDefault(),
                    AlbumAppearances = (from song in DbContext.media_product
                                        where song.recordingid == mediaId
                                        join album in DbContext.media_product_package
                                        on song.packageid equals album.id
                                        select new AlbumDto
                                        {
                                            AlbumId = album.id,
                                            AlbumTitle = album.albumtitle,
                                            MainArtistId = album.mainartistid,
                                            MainArtistName = album.party_mainartist.artistname ?? "",
                                            NumberOfTracks = album.numberoftracks ?? 0,
                                            ReleaseYear = album.releasedate.Value.Year
                                        }),
                    Musicians = (from recording in DbContext.recording_party
                                 where recording.recordingid == mediaId
                                 join person in DbContext.party_real
                                 on recording.partyrealid equals person.id
                                 join role in DbContext.party_partyroletype
                                 on recording.rolecode equals role.rolecode
                                 select new MusicianCreditsDto
                                 {
                                     PersonId = person.id,
                                     FullName = person.fullname,
                                     RoleCode = recording.rolecode,
                                     InstrumentName = (from i in DbContext.party_instrumenttype
                                                       where i.code == recording.instrumentcode
                                                       select i.name_is).FirstOrDefault(),
                                     RoleNameIs = role.rolename_is
                                 })
                }).SingleOrDefault();

            if (media != null)
            {
                media.Composers = media.Musicians.Where(x => x.RoleCode == "COM");
                media.Musicians = media.Musicians.Where(x => x.RoleCode != "COM");
            }

            return media;
        }
    }
}
