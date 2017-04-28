using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Organization
{
    public class OrganizationRepository : RepositoryBase<organization_master, HljodritEntities>, IOrganizationRepository
    {
        public OrganizationRepository(IDbFactory<HljodritEntities> dbFactory) : base(dbFactory)
        {
        }

        public IEnumerable<PublisherIsrcSeriesDto> GetPublisherIsrcSeriesById(int publisherId)
        {
            return DbContext.organization_master.Where(o => o.id == publisherId)
                .Join(DbContext.organization_isrc_series, master => master.id, series => series.organizationid,
                    (master, series) => new PublisherIsrcSeriesDto
                    {
                        IsrcSeriesId = series.id,
                        IsrcOrganizationPart = series.isrc_organizationpart,
                        OrganizationId = master.id,
                        PurposeLabel = series.purposelabel,
                        LastIsrcNumber = series.isrc_lastusednumber
                    });
        }

        public IEnumerable<LabelDto> GetLabelsByPublisherId(int publisherId)
        {
            var labels = from publisher in DbContext.organization_labels
                where publisher.organizationid == publisherId
                select new LabelDto
                {
                    OrganizationId = publisher.organizationid,
                    LabelId = publisher.id,
                    LabelName = publisher.labelname
                };

            return labels.ToList();
        }

        public PublisherExtendedDto GetPublisherById(int publisherId)
        {
            var notRegistered = "Ekki skráð";

            var publisher = (from pub in DbContext.organization_master
                where pub.id == publisherId
                join t in DbContext.organization_type
                on pub.organizationtype equals t.id
                select new PublisherExtendedDto
                {
                    Id = pub.id,
                    Name = pub.name,
                    Address = pub.address1,
                    MainContactName = String.IsNullOrEmpty(pub.maincontact) ? notRegistered : pub.maincontact,
                    MainContactEmail = String.IsNullOrEmpty(pub.maincontactemail) ? notRegistered : pub.maincontactemail,
                    MainContactPhoneNumber = String.IsNullOrEmpty(pub.maincontacttel) ? notRegistered : pub.maincontacttel,
                    SSN = String.IsNullOrEmpty(pub.uniqueidentifier) ? notRegistered : pub.uniqueidentifier, 
                    ZipCode = String.IsNullOrEmpty(pub.zipcode) ? notRegistered : pub.zipcode,
                    City = String.IsNullOrEmpty(pub.address2) ? notRegistered : pub.address2,
                    Website = String.IsNullOrEmpty(pub.website) ? notRegistered : pub.website,
                    OrganizationType = t.typename_is
                }).SingleOrDefault();

            if (publisher == null) return null;

            publisher.Labels = GetLabelsByPublisherId(publisherId);

            var allAlbums = new List<AlbumDto>();

            foreach (var label in publisher.Labels)
            {
                allAlbums.AddRange(GetAlbumsByLabelId(label.LabelId));
            }

            publisher.Albums = allAlbums;

            return publisher;
        }

        public IEnumerable<AlbumDto> GetAlbumsByLabelId(int labelId)
        {
            var albums = (from album in DbContext.media_product_package
                where album.labelid == labelId
                select new AlbumDto
                {
                    AlbumId = album.id,
                    AlbumTitle = album.albumtitle,
                    MainArtistId = album.mainartistid ?? -1,
                    NumberOfTracks = album.numberoftracks ?? -1,
                    ReleaseYear = album.releasedate.Value.Year
                }).ToList();

            

            foreach (var album in albums)
            {
                album.MainArtistName = (from artist in DbContext.party_mainartist
                    where artist.id == album.MainArtistId
                    select artist.artistname).FirstOrDefault();
            }

            return albums;
        }
    }
}



