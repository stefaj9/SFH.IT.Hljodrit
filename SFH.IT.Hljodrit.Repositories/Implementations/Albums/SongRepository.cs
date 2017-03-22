using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;
using System.Net.Sockets;
using SFH.IT.Hljodrit.Common.Dto;
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
                                              select x).Distinct().Count(),
                            MainArtistId = mainArtist.id,
                            MainArtist = mainArtist.artistname,
                            Registration = new RegistrationDto
                            {
                                Comment = song.comment,
                                CreatedBy = song.createdby,
                                CreatedOn = song.createdon,
                                UpdatedBy = song.updatedby,
                                UpdatedOn = song.updatedon
                            },
                        };

            return songs.Distinct().OrderBy(x => x.TrackNumber);
        }
        
        public SongExtendedDto GetSongOnAlbum(int albumId, int songId)
        {
            //var result = from song in DbContext.media_product
            //    where song.packageid.Value == albumId && song.id == songId
            //    select song;

            //return new SongExtendedDto(result.SingleOrDefault());

            var result = from song in DbContext.media_product
                        join recording in DbContext.media_recording on song.recordingid equals recording.id
                        join mainArtist in DbContext.party_mainartist on recording.mainartist equals mainArtist.id
                        where song.packageid.Value == albumId && song.id == songId

                        select new SongExtendedDto
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
                                              select x).Distinct().Count(),
                            MainArtistId = mainArtist.id,
                            MainArtist = mainArtist.artistname,
                            Registration = new RegistrationDto
                            {
                                Comment = song.comment,
                                CreatedBy = song.createdby,
                                CreatedOn = song.createdon,
                                UpdatedBy = song.updatedby,
                                UpdatedOn = song.updatedon
                            },
                        };
            return result.SingleOrDefault();

        }
    }
}