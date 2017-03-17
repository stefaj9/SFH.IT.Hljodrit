using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
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
                        where song.packageid == albumId
                        select new SongDto
                        {
                            Id = song.id,
                            Title = song.title,
                            TrackNumber = song.tracknumber ?? -1
                        };

            return songs;
        }
        
        public SongExtendedDto GetSongOnAlbum(int albumId, int songId)
        {
            var result = from song in DbContext.media_product
                where song.packageid.Value == albumId && song.id == songId
                select song;

            return new SongExtendedDto(result.SingleOrDefault());
        }
    }
}