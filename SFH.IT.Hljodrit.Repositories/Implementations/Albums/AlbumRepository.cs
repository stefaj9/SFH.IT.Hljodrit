﻿using System;
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
    public class AlbumRepository : RepositoryBase<media_product_package, HljodritEntitiesDb>, IAlbumRepository
    {
        public AlbumRepository(IDbFactory<HljodritEntitiesDb> dbFactory)
                : base(dbFactory) { }

        public Envelope<AlbumDto> GetAlbums(int pageSize, int pageNumber, string searchTerm, Expression<Func<media_product_package, bool>> expression)
        {
            var totalAlbums = (from album in DbContext.media_product_package.Where(expression)
                               join mainArtist in DbContext.party_mainartist on album.mainartistid equals mainArtist.id into mainArtistNullCheck
                               from ma in mainArtistNullCheck.DefaultIfEmpty()
                               select new AlbumDto()
                               {

                                   AlbumId = album.id,
                                   AlbumTitle = album.albumtitle,
                                   ReleaseYear = album.releasedate.Value.Year,
                                   NumberOfTracks = (from song in DbContext.media_product
                                                     where song.packageid == album.id
                                                     select song).Count(),
                                   MainArtistName = ma.artistname ?? "",
                                   MainArtistId = album.mainartistid ?? 0

                               }).OrderBy(album => album.AlbumTitle).Skip((pageNumber - 1) * pageSize).Take(pageSize); ;

            var albumsCount = DbContext.media_product_package.Count(expression);
            var result = EnvelopeCreator.CreateEnvelope(totalAlbums, pageSize, pageNumber, albumsCount);

            return result;
        }

        public AlbumExtendedDto GetAlbumById(int id)
        {
            var result = (from album in DbContext.media_product_package
                         where album.id == id
                         join mainArtist in DbContext.party_mainartist on album.mainartistid equals mainArtist.id into
                         albumsWithArtist

                         from y in albumsWithArtist.DefaultIfEmpty()
                         join label in DbContext.organization_labels on album.labelid equals label.id into
                         albumsWithArtistAndLabel

                         from x in albumsWithArtistAndLabel.DefaultIfEmpty()
                         join countryOfProduction in DbContext.common_country on album.countryofproduction equals
                         countryOfProduction.numericisocode into albumWithCountryCode

                         from z in albumWithCountryCode.DefaultIfEmpty()
                         join countryOfPublication in DbContext.common_country on album.countryofpublication equals
                         countryOfPublication.numericisocode into completeAlbum

                         from c in completeAlbum
                         select new { album, y, x, z, c }).ToList();


            return (from r in result
                    select new AlbumExtendedDto
                    {
                        AlbumId = r.album.id,
                        AlbumTitle = r.album.albumtitle,
                        ReleaseDate = r.album.releasedate,
                        MainArtistName = r.y != null ? r.y.artistname ?? "" : "",
                        MainArtistId = r.album.mainartistid ?? 0,
                        CatalogueNumber = r.album.cataloguenumber,
                        CountryOfProduction = r.z.twoletterisocode,
                        CountryOfPublication = r.c.twoletterisocode,
                        Label = r.x != null ? r.x.labelname ?? "" : "",
                        LabelId = r.album.labelid,
                        PublisherId = r.x?.organizationid ?? -1,
                        Publisher = r.x != null ? (from a in DbContext.organization_master
                                     where a.id == r.x.organizationid
                                     select a.name).FirstOrDefault() : "",
                        Registration = new RegistrationDto()
                        {
                            Comment = r.album.comment,
                            CreatedBy = r.album.createdby,
                            CreatedOn = r.album.createdon,
                            UpdatedBy = r.album.updatedby,
                            UpdatedOn = r.album.updatedon
                        }
                    }).SingleOrDefault();
        }

        //public MusicianExtendedDto GetMusicianOnAlbum(int albumId, int musicianId)
        //{
        //    var result = from song in DbContext.media_product
        //        join recording in DbContext.recording_party on song.recordingid equals recording.recordingid
        //        join person in DbContext.party_real on recording.partyrealid equals person.id
        //        join instrument in DbContext.party_instrumenttype on recording.instrumentcode equals instrument.code
        //        where song.packageid == albumId && person.id == musicianId
        //        group new { instrument.description_is } by new { song.title, song.id, person.fullname };

        //    var musician = new MusicianExtendedDto();

        //    foreach (var group in result)
        //    {
        //        var instrumentList = (from instrument in @group
        //                              where instrument.description_is != null
        //                              select instrument.description_is).Distinct().ToList();

        //        musician.Fullname = group.Key.fullname;
        //        musician.Songs.Add(group.Key.title, instrumentList);
        //    }
        //    return musician;
        //}


        public ICollection<MusiciansOnSongDto> GetMusiciansOnSong(int albumId, int songId)
        {
            var result = from song in DbContext.media_product
                         join recording in DbContext.recording_party on song.recordingid equals recording.recordingid
                         join person in DbContext.party_real on recording.partyrealid equals person.id
                         join instrument in DbContext.party_instrumenttype on recording.instrumentcode equals instrument.code into instrumentCheck
                         from subinstruments in instrumentCheck.DefaultIfEmpty()
                         join role in DbContext.party_partyroletype on recording.rolecode equals role.rolecode
                         where song.packageid == albumId && song.id == songId && !person.isdeleted
                         group new { song, recording, person, subinstruments, role } by new { person.id, recordingId = recording.id, person.fullname };

            var allSongs = new List<MusiciansOnSongDto>();
            foreach (var group in result)
            {
                var credits = new List<MusicianCreditsDto>();
                foreach (var e in group)
                {
                    var musicianCredits = new MusicianCreditsDto();
                    var registration = new RegistrationDto();
                    SetAllRegistrationFields(registration, e.recording.comment, e.recording.updatedon, e.recording.updatedby, e.recording.createdon, e.recording.createdby);
                    SetAllMusicianFields(musicianCredits, registration, e.recording.id, albumId, null, e.person.fullname, e.person.id, e.subinstruments == null ? "" : e.subinstruments.description_is, e.subinstruments == null ? "" : e.subinstruments.code, e.role.rolename_is, e.recording.rolecode);
                    credits.Add(musicianCredits);
                }
                var musician = new MusiciansOnSongDto(group.Key.id, group.Key.recordingId, group.Key.fullname, null, null, credits);

                allSongs.Add(musician);
            }

            return allSongs;
        }


        private static void SetAllMusicianFields(MusicianCreditsDto musicianCredits, RegistrationDto registration, int creditId, int albumId, string nickName,
                                          string fullName, int personId, string instrument, string instrumentCode, string roleName, string roleCode)
        {
            musicianCredits.Registration = registration;
            musicianCredits.CreditId = creditId;
            musicianCredits.AlbumId = albumId;
            musicianCredits.ArtistNickName = nickName;
            musicianCredits.FullName = fullName;
            musicianCredits.PersonId = personId;
            musicianCredits.InstrumentName = instrument;
            musicianCredits.RoleNameIs = roleName;
            musicianCredits.RoleCode = roleCode;
            musicianCredits.InstrumentCode = instrumentCode;
        }

        private static void SetAllRegistrationFields(RegistrationDto registration, string comment, DateTime updatedOn, string upDatedBy, DateTime createdOn, string createdBy)
        {
            registration.Comment = comment;
            registration.UpdatedOn = updatedOn;
            registration.UpdatedBy = upDatedBy;
            registration.CreatedOn = createdOn;
            registration.CreatedBy = createdBy;
        }

        public IEnumerable<AlbumDto> GetAlbumsAssociatedWithMusician(int partyRealId)
        {
            var result = (from product in DbContext.media_product
                join recording in DbContext.media_recording on product.recordingid equals recording.id
                join productPackage in DbContext.media_product_package on product.packageid equals productPackage.id
                join mainArtist in DbContext.party_mainartist on productPackage.mainartistid equals mainArtist.id into mainArtistNullCheck
                from ma in mainArtistNullCheck.DefaultIfEmpty()
                join recordingParty in DbContext.recording_party on recording.id equals recordingParty.recordingid
                where recordingParty.partyrealid == partyRealId
                group new {productPackage, ma } by new {productPackage.id});

            var albums = new List<AlbumDto>();

            foreach (var groups in result)
            {
                var firstGroupItem = groups.FirstOrDefault();
                if (firstGroupItem != null)
                {
                    albums.Add(new AlbumDto
                    {
                        AlbumId = firstGroupItem.productPackage.id,
                        AlbumTitle = firstGroupItem.productPackage.albumtitle,
                        MainArtistId = firstGroupItem.productPackage.mainartistid,
                        MainArtistName = firstGroupItem.ma != null ? firstGroupItem.ma.artistname ?? "" : "",
                        NumberOfTracks = firstGroupItem.productPackage.numberoftracks ?? 0,
                        ReleaseYear = firstGroupItem.productPackage.releasedate?.Year ?? 0
                    });
                }
            }

            return albums;
        }
    }
}
