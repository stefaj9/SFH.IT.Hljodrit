using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.StaticHelperClasses;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Albums
{ 
    public class SongRepository : RepositoryBase<media_product>, ISongRepository
    {
        public SongRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

        public IEnumerable<SongDto> GetSongsByAlbumId(int albumId)
        {
            var songs = from song in DbContext.media_product
                        join recording in DbContext.media_recording on song.recordingid equals recording.id
                        join mainArtist in DbContext.party_mainartist on recording.mainartist equals mainArtist.id
                        where song.packageid.Value == albumId

                        select new SongDto
                        {
                            Id = song.id,
                            Title = song.title,
                            TrackNumber = song.tracknumber ?? -1,
                            AlbumId = albumId,
                            Duration = recording.duration.Value,
                            Isrc = song.isrc,
                            ReleaseDate = song.releasedate,
                            RecordingId = song.recordingid,
                            TotalMusicians = (from x in DbContext.recording_party
                                              where x.recordingid == song.recordingid
                                              select x).GroupBy(x => x.partyrealid).Count(),
                            MainArtistId = mainArtist.id,
                            MainArtist = mainArtist.artistname,
                            Registration = new RegistrationDto
                            {
                                Comment = song.comment,
                                CreatedBy = song.createdby,
                                CreatedOn = song.createdon,
                                UpdatedBy = song.updatedby,
                                UpdatedOn = song.updatedon
                            }
                        };

            return songs.Distinct().OrderBy(x => x.TrackNumber);
        }

        public SongDto GetSongOnAlbum(int albumId, int songId)
        {

            var result = from song in DbContext.media_product
                         join recording in DbContext.media_recording on song.recordingid equals recording.id
                         join mainArtist in DbContext.party_mainartist on recording.mainartist equals mainArtist.id
                         where song.packageid.Value == albumId && song.id == songId

                         select new SongDto
                         {
                             Id = song.id,
                             Title = song.title,
                             TrackNumber = song.tracknumber ?? -1,
                             AlbumId = albumId,
                             Duration = recording.duration.Value,
                             Isrc = song.isrc,
                             SideNumber = song.sidenumber ?? -1,
                             ReleaseDate = song.releasedate,
                             RecordingId = song.recordingid,
                             TotalMusicians = (from x in DbContext.recording_party
                                               where x.recordingid == song.recordingid
                                               select x).GroupBy(x => x.partyrealid).Count(),
                             MainArtistId = mainArtist.id,
                             MainArtist = mainArtist.artistname,
                             Registration = new RegistrationDto
                             {
                                 Comment = song.comment,
                                 CreatedBy = song.createdby,
                                 CreatedOn = song.createdon,
                                 UpdatedBy = song.updatedby,
                                 UpdatedOn = song.updatedon
                             }
                         };
            return result.SingleOrDefault();
        }

        public Envelope<SongDto> GetSongs(int pageSize, int pageNumber, string searchTerm, Expression<Func<SongDto, bool>> expr)
        {
            var songs = DbContext.media_product.Where(
                song => song.title.StartsWith(searchTerm)).Select(song => new SongDto()
            {
                Id = song.id,
                Title = song.title,
                TrackNumber = song.tracknumber ?? -1,
                ReleaseDate = song.releasedate,
                MainArtist = song.media_recording.party_mainartist.artistname,
                Isrc = song.isrc,
                Duration = song.media_recording.duration,
                TotalMusicians = (from x in DbContext.recording_party
                                  where x.recordingid == song.recordingid
                                  select x).GroupBy(x => x.partyrealid).Count()
                }).Where(expr).OrderBy(song => song.Title).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            var totalSongs = DbContext.media_product.Count(song => song.title.StartsWith(searchTerm));
            var result = EnvelopeCreator.CreateEnvelope(songs, pageSize, pageNumber, totalSongs);

            return result;
        }
    }
}