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
    public class AlbumRepository : RepositoryBase<media_product_package>, IAlbumRepository
    {
        public AlbumRepository(IDbFactory dbFactory)
                : base(dbFactory) { }

        public IEnumerable<AlbumDto> GetAlbums()
        {
            var albums = DbContext.media_product_package.Join(DbContext.party_mainartist,
                mediaProductPackage => mediaProductPackage.mainartistid,
                partyMainArtist => partyMainArtist.id, (mediaProductPackage, partyMainArtist) => new AlbumDto()
                {
                    Id = mediaProductPackage.id,
                    AlbumTitle = mediaProductPackage.albumtitle,
                    ReleaseDate = mediaProductPackage.releasedate,
                    MainArtistName = partyMainArtist.artistname,
                    MainArtistId = partyMainArtist.id

                });
            return albums;
        }
    }
}