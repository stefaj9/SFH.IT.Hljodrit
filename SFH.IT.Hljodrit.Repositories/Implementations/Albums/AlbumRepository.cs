using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
                    AlbumId = mediaProductPackage.id,
                    AlbumTitle = mediaProductPackage.albumtitle,
                    ReleaseDate = mediaProductPackage.releasedate,
                    MainArtistName = partyMainArtist.artistname,
                    MainArtistId = partyMainArtist.id

                });
            return albums;
        }

        public AlbumExtendedDto GetAlbumById(int id)
        {
            var result = from album in DbContext.media_product_package
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
                join countryOfPublication in DbContext.common_country on album.countryofproduction equals
                countryOfPublication.numericisocode into completeAlbum
                select new {album, y, x, z};


                return (from r in result
                        select new AlbumExtendedDto
                         {
                            AlbumId = r.album.id,
                             AlbumTitle = r.album.albumtitle,
                             ReleaseDate = r.album.releasedate,
                             MainArtistName = r.y.artistname,
                             MainArtistId = r.y.id,
                             CatalogueNumber = r.album.cataloguenumber,
                             CountryOfProduction = r.z.name_is,
                             CountryOfPublication = r.z.name_is,
                             Label = r.x.labelname,
                             PublisherId = r.x.organizationid,
                            Publisher = (from a in DbContext.organization_master
                                         where a.id == r.x.organizationid
                                         select a.name).FirstOrDefault(),
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

        public IEnumerable<MusiciansOnSongDto> GetMusiciansByAlbumId(int albumId)
        {
            //var query = from song in DbContext.media_product
            //            join album in DbContext.media_product_package on song.packageid equals album.id
            //            join musician in DbContext.recording_party on song.recordingid equals musician.recordingid
            //            join person in DbContext.party_real on musician.partyrealid equals person.id
            //            where album.id == albumId
            //            group new { song, person } by new { Id = person.id, Fullname = person.fullname };

            //var result = from musician in query.ToList()
            //             select new MusiciansOnSongDto
            //             {
            //                 Id = musician.Key.Id,
            //                 Fullname = musician.Key.Fullname,
            //                 SongCount = musician.Distinct().Count()
            //             };

            return null;// result.ToList();
        }

        public MusicianExtendedDto GetMusicianOnAlbum(int albumId, int musicianId)
        {
            var result = from song in DbContext.media_product
                join recording in DbContext.recording_party on song.recordingid equals recording.recordingid
                join person in DbContext.party_real on recording.partyrealid equals person.id
                join instrument in DbContext.party_instrumenttype on recording.instrumentcode equals instrument.code
                where song.packageid == albumId && person.id == musicianId
                group new { instrument.description_is } by new { song.title, song.id, person.fullname };

            var musician = new MusicianExtendedDto();

            foreach (var group in result)
            {
                var instrumentList = (from instrument in @group
                                      where instrument.description_is != null
                                      select instrument.description_is).Distinct().ToList();

                musician.Fullname = group.Key.fullname;
                musician.Songs.Add(group.Key.title, instrumentList);
            }
            return musician;
        }

        public MusiciansOnSongDto GetMusiciansOnSong(int albumId, int songId)
        {
            var result = from song in DbContext.media_product
                join recording in DbContext.recording_party on song.recordingid equals recording.recordingid
                join person in DbContext.party_real on recording.partyrealid equals person.id
                join instrument in DbContext.party_instrumenttype on recording.instrumentcode equals instrument.code
                where song.packageid == albumId && song.id == songId
                group new {song, recording, person, instrument} by new { person.id, person.fullname };

            var musiciansOnSong = new MusiciansOnSongDto();

            foreach (var person in result)
            {
                musiciansOnSong.SongId = songId;
                var instruments = new List<InstrumentDto>();
                var registration = new RegistrationDto();
                var credits = new CreditsDto();
                var musician = new MusicianDto(person.Key.id, person.Key.fullname, ""); 

                foreach (var element in person)
                {
                    instruments.Add(new InstrumentDto(element.instrument.code, element.instrument.name_en, element.instrument.name_is, element.instrument.description_is));
                    SetAllRegistrationFields(registration, "", element.person.updatedon,"", new DateTime(), "");
                    credits.RecordingId = element.recording.recordingid;
                }

                credits.Registration = registration;
                credits.Instruments = instruments;
                musician.Credits.Add(credits);
                musiciansOnSong.Musicians.Add(musician);
            }
            return musiciansOnSong;
        }

        private void SetAllRegistrationFields(RegistrationDto registration, string comment, DateTime updatedOn, string upDatedBy, DateTime createdOn, string createdBy)
        {
            registration.Comment = comment;
            registration.UpdatedOn = updatedOn;
            registration.UpdatedBy = upDatedBy;
            registration.CreatedOn = createdOn;
            registration.CreatedBy = createdBy;
        }
    }
}
