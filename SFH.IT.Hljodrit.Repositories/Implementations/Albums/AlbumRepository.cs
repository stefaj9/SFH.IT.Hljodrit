using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
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

        public AlbumExtendedDto GetAlbumById(int id)
        {
            var resultAlbum = (from album in DbContext.media_product_package
                where album.id == id
                join mainArtist in DbContext.party_mainartist on album.mainartistid equals mainArtist.id into albumsWithArtist

                from y in albumsWithArtist.DefaultIfEmpty()
                join label in DbContext.organization_labels on album.labelid equals label.id into albumsWithArtistAndLabel

                from x in albumsWithArtistAndLabel.DefaultIfEmpty()
                join countryOfProduction in DbContext.common_country on album.countryofproduction equals countryOfProduction.numericisocode into albumWithCountryCode

                from z in albumWithCountryCode.DefaultIfEmpty()
                join countryOfPublication in DbContext.common_country on album.countryofproduction equals countryOfPublication.numericisocode into completeAlbum

                from k in completeAlbum.DefaultIfEmpty()
                select new AlbumExtendedDto
                {
                    Id = album.id,
                    AlbumTitle = album.albumtitle,
                    ReleaseDate = album.releasedate,
                    MainArtistName = string.IsNullOrEmpty(y.artistname) ? "unknown" : y.artistname, 
                    MainArtistId = y.id,
                    CatalogueNumber = string.IsNullOrEmpty(album.cataloguenumber) ? "unknown" : album.cataloguenumber,
                    CountryOfProduction = string.IsNullOrEmpty(z.name_is) ? "unknown" : z.name_is,
                    CountryOfPublication = string.IsNullOrEmpty(k.name_is) ? "unknown" : k.name_is,
                    Label = string.IsNullOrEmpty(x.labelname) ? "unknown" : x.labelname
                }).SingleOrDefault();

            return resultAlbum;
        }
    }
}
