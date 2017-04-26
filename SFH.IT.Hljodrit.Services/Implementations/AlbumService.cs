using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.Helpers;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;
using SFH.IT.Hljodrit.Repositories.Interfaces.Media;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class AlbumService : IAlbumService
    {
        private readonly IUnitOfWork<HljodritEntities> _unitOfWork;
        private readonly ISongRepository _songRepository;
        private readonly IAlbumRepository _albumRepository;
        private readonly ICountryRepository _countryRepository;
        private readonly IMediaRecordingRepository _mediaRecordingRepository;
        private readonly IRecordingPartyRepository _recordingPartyRepository;
        private readonly IOrganizationIsrcSeriesRepository _organizationIsrcSeriesRepository;
        private readonly IOrganizationLabelRepository _organizationLabelRepository;
        private const string AlbumReleaseYearSearchFilter = "releaseYear";
        private const string AlbumMainArtistSearchFilter = "mainArtistName";

        public AlbumService(ISongRepository songRepository, IAlbumRepository albumRepository, IUnitOfWork<HljodritEntities> unitOfWork, ICountryRepository countryRepository, IMediaRecordingRepository mediaRecordingRepository, IRecordingPartyRepository recordingPartyRepository, IOrganizationIsrcSeriesRepository organizationIsrcSeriesRepository, IOrganizationLabelRepository organizationLabelRepository)
        {
            _songRepository = songRepository;
            _albumRepository = albumRepository;
            _unitOfWork = unitOfWork;
            _countryRepository = countryRepository;
            _mediaRecordingRepository = mediaRecordingRepository;
            _recordingPartyRepository = recordingPartyRepository;
            _organizationIsrcSeriesRepository = organizationIsrcSeriesRepository;
            _organizationLabelRepository = organizationLabelRepository;
        }

        public Envelope<AlbumDto> GetAlbums(int pageSize, int pageNumber, string searchTerm, string searchFilter)
        {
            searchTerm = string.IsNullOrEmpty(searchTerm) ? "": searchTerm.Trim();

            // The default search is to search by the albums title
            Expression <Func<media_product_package, bool>> filter = album => album.albumtitle.Trim().StartsWith(searchTerm);

            switch (searchFilter)
            {
                case AlbumMainArtistSearchFilter:
                    filter = album => album.party_mainartist == null || album.party_mainartist.artistname.StartsWith(searchTerm);
                    break;
                case AlbumReleaseYearSearchFilter:
                    var releaseYear = Convert.ToInt32(searchTerm.Trim());
                    filter = album => album.releasedate.Value.Year == releaseYear;
                    break;
            }

            return _albumRepository.GetAlbums(pageSize, pageNumber, searchTerm, filter);
        }

        public AlbumExtendedDto GetAlbumById(int albumId)
        {
            return _albumRepository.GetAlbumById(albumId);
        }

        public IEnumerable<SongDto> GetSongsByAlbumId(int albumId)
        {
            var songs = _songRepository.GetSongsByAlbumId(albumId).ToList();
            return songs;
        }

        public SongDto GetSongOnAlbum(int albumId, int songId)
        {
            var song = _songRepository.GetSongOnAlbum(albumId, songId);
            return song;
        }

        public ICollection<MusiciansOnSongDto> GetMusiciansOnSong(int albumId, int songId)
        {
            var musicians = _albumRepository.GetMusiciansOnSong(albumId, songId);
            return musicians;
        }

        public AlbumExtendedDto UpdateAlbumInfo(int albumId, AlbumViewModel updatedAlbum)
        {
            var albumEntity = _albumRepository.Get(a => a.id == albumId);
            var countryOfProduction = _countryRepository.Get(c => c.twoletterisocode == updatedAlbum.CountryOfProduction);
            var countryOfPublication = _countryRepository.Get(c => c.twoletterisocode == updatedAlbum.CountryOfPublication);
            albumEntity.albumtitle = updatedAlbum.AlbumTitle;
            albumEntity.countryofproduction = countryOfProduction.numericisocode;
            albumEntity.countryofpublication = countryOfPublication.numericisocode;
            albumEntity.labelid = (updatedAlbum.LabelId == -1)?  null : updatedAlbum.LabelId;
            albumEntity.mainartistid = updatedAlbum.MainArtistId;

            _albumRepository.Update(albumEntity);

            _unitOfWork.Commit();

            return GetAlbumById(albumId);
        }

        public int CreateAlbum(AlbumCreationViewModel album)
        {

            int albumId;

            var label = _organizationLabelRepository.GetById(album.PublisherLabelId);
            var isrcSeries = _organizationIsrcSeriesRepository.GetById(album.Publisher.IsrcSeriesId);
            var currentDate = DateTime.Now;

            var productPackage = new media_product_package
            {
                albumtitle = album.BasicInfo.AlbumTitle,
                albumid = 0,
                physicallocation = "",
                labelid = album.PublisherLabelId,
                cataloguenumber = "",
                releasetypecode = "0",
                countryofproduction = label.countrycode,
                countryofpublication = label.countrycode,
                releasedate = currentDate,
                packagestatusid = 4,
                numberoftracks = album.BasicInfo.NumberOfTracks,
                formattypeid = 2,
                comment = album.ReviewComment,
                updatedby = "User",
                updatedon = currentDate,
                createdby = "User",
                createdon = currentDate,
                mainartistid = album.BasicInfo.MainArtistId
            };
            _albumRepository.Add(productPackage);

            _unitOfWork.Commit();

            albumId = productPackage.id;

            foreach (var song in album.Songs)
            {
                // If newly created song has already been created with the same isrc.
                if (song.Id == -1 && _mediaRecordingRepository.Get(m => m.isrc == song.Isrc) != null) { throw new DuplicateNameException("Isrc provided does already exist."); }

                int recordingId;

                if (song.Id == -1)
                {
                    //   1.3. Create media_recording (s)
                    var recording = new media_recording
                    {
                        isrc = song.Isrc,
                        recordingtitle = song.Name,
                        workingtitle = song.Name,
                        recordingcountrycode = label.countrycode,
                        statusid = 4,
                        updatedby = "User",
                        updatedon = currentDate,
                        createdby = "User",
                        createdon = currentDate,
                        recordingdate = song.RecordingDate,
                        duration = song.Length,
                        mainartist = album.BasicInfo.MainArtistId,
                        markedfordeletion = false
                    };

                    _mediaRecordingRepository.Add(recording);
                    _unitOfWork.Commit();

                    recordingId = recording.id;
                }
                else
                {
                    recordingId = song.Id;
                }

                //   1.4. Create media_product (s)
                _songRepository.Add(new media_product
                {
                    isrc = song.Isrc,
                    recordingid = recordingId,
                    title = song.Name,
                    tracknumber = song.Number,
                    sidenumber = 1,
                    labelid = album.PublisherLabelId,
                    cataloguenumber = "",
                    mediaproducttypeid = 1,
                    packageid = albumId,
                    releasedate = currentDate,
                    countryofproduction = label.countrycode,
                    statusid = 4,
                    updatedby = "User",
                    updatedon = currentDate,
                    createdby = "User",
                    createdon = currentDate,
                    is_deleted = false
                });

                //   1.5. Add to recording_party
                song.Performers.ForEach(performer => _recordingPartyRepository.Add(new recording_party
                {
                    recordingid = recordingId,
                    partyrealid = performer.Id,
                    rolecode = performer.Role.RoleCode,
                    instrumentcode = performer.Instrument.IdCode,
                    updatedby = "User",
                    updatedon = currentDate,
                    createdby = "User",
                    createdon = currentDate,
                    status = 2
                }));
            }

            isrcSeries.updatedon = currentDate;
            isrcSeries.updatedby = "User";
            isrcSeries.isrc_lastusednumber += 100;
            isrcSeries.isrc_lastusedyear = DateTime.Now.Year;

            _organizationIsrcSeriesRepository.Update(isrcSeries);

            //   1.6. Commit changes
            _unitOfWork.Commit();

            return albumId;
        }

        //public MusicianExtendedDto GetMusicianOnAlbum(int albumId, int musicianId)
        //{
        //    return _albumRepository.GetMusicianOnAlbum(albumId, musicianId);
        //}
    }
}