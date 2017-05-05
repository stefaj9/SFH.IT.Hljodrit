using System;
using System.Linq;
using System.Linq.Expressions;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;
using SFH.IT.Hljodrit.Repositories.Interfaces.Media;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;
using SFH.IT.Hljodrit.Services.Implementations;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
    [TestClass]
    public class AlbumServiceTest
    {
        private Mock<IAlbumRepository> _albumRepository;
        private Mock<ISongRepository> _songRepository;
        private Mock<ICountryRepository> _countryRepository;
        private Mock<IMediaRecordingRepository> _mediaRecordingRepository;
        private Mock<IRecordingPartyRepository> _recordingPartyRepository;
        private Mock<IOrganizationIsrcSeriesRepository> _organizationIsrcSeriesRepository;
        private Mock<IOrganizationLabelRepository> _organizationLabelRepository;
        private Mock<IUnitOfWork<HljodritEntitiesDb>> _unitOfWork;

        private IAlbumService _albumService;

        private const string AlbumReleaseYearSearchFilter = "releaseYear";
        private const string AlbumMainArtistSearchFilter = "mainArtistName";

        [TestInitialize]
        public void TestInitialize()
        {
            _albumRepository = new Mock<IAlbumRepository>();
            _songRepository = new Mock<ISongRepository>();
            _countryRepository = new Mock<ICountryRepository>();
            _mediaRecordingRepository = new Mock<IMediaRecordingRepository>();
            _recordingPartyRepository = new Mock<IRecordingPartyRepository>();
            _organizationIsrcSeriesRepository = new Mock<IOrganizationIsrcSeriesRepository>();
            _organizationLabelRepository = new Mock<IOrganizationLabelRepository>();
            _unitOfWork = new Mock<IUnitOfWork<HljodritEntitiesDb>>();

            _albumService = new AlbumService(_songRepository.Object, 
                _albumRepository.Object, 
                _unitOfWork.Object, 
                _countryRepository.Object, 
                _mediaRecordingRepository.Object, 
                _recordingPartyRepository.Object, 
                _organizationIsrcSeriesRepository.Object, 
                _organizationLabelRepository.Object);
        }

        [TestMethod]
        public void AlbumServiceTestGetAlbumsWithFilterSuccess()
        {
            // Arrange
            const int pageSize = 25;
            const int pageNumber = 1;
            const int expectedResultCount = 25;

            var mockAlbumsObject = Builder<AlbumDto>.CreateListOfSize(25).Build();
            _albumRepository.Setup(
                    s =>
                        s.GetAlbums(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>(),
                            It.IsAny<Expression<Func<media_product_package, bool>>>()))
                .Returns(new Envelope<AlbumDto>
                {
                    CurrentPage = 1,
                    MaximumPage = 1,
                    Objects = mockAlbumsObject
                });

            // Act
            var albumResultEnvelope = _albumService.GetAlbums(pageSize, pageNumber, "", AlbumMainArtistSearchFilter);

            // Assert
            Assert.AreEqual(albumResultEnvelope.Objects.Count(), expectedResultCount);
        }

        [TestMethod]
        public void AlbumServiceTestGetAlbumByIdSuccess()
        {
            // Arrange
            var expectedId = 1337;
            var album = Builder<AlbumExtendedDto>
                .CreateNew()
                .With(x => x.AlbumId = 1337)
                .Build();

            _albumRepository.Setup(a => a.GetAlbumById(It.IsAny<int>())).Returns(album);

            // Act
            var albumResult =_albumService.GetAlbumById(expectedId);

            // Assert
            Assert.AreEqual(expectedId, albumResult.AlbumId);
        }

        [TestMethod]
        public void AlbumServiceTestGetSongsByAlbumIdSuccess()
        {
            var expectedId = 1337;
            var expectedAlbumCount = 25;
            var songs = Builder<SongDto>
                .CreateListOfSize(25)
                .All()
                .With(x => x.AlbumId = 1337)
                .Build();

            _songRepository.Setup(s => s.GetSongsByAlbumId(It.IsAny<int>())).Returns(songs);

            // Act
            var songResults = _albumService.GetSongsByAlbumId(expectedId);

            // Assert
            Assert.AreEqual(expectedAlbumCount, songResults.Count());
        }

        [TestMethod]
        public void AlbumServiceTestGetSongOnAlbumSuccess()
        {
            // Arrange
            var songId = 5;
            var expectedId = 1337;
            var song = Builder<SongDto>
                .CreateNew()
                .With(x => x.Id = 1337)
                .Build();

            _songRepository.Setup(s => s.GetSongOnAlbum(It.IsAny<int>(), It.IsAny<int>())).Returns(song);

            // Act
            var songResult = _albumService.GetSongOnAlbum(songId, expectedId);

            // Assert
            Assert.AreEqual(expectedId, songResult.Id);
        }

        [TestMethod]
        public void AlbumServiceTestGetMusiciansOnSongSuccess()
        {
            // Arrange
            var songId = 5;
            var albumId = 1337;
            var expectedNumberOfMusicians = 5;
            var musicians = Builder<MusiciansOnSongDto>
                .CreateListOfSize(5)
                .Build();

            _albumRepository.Setup(s => s.GetMusiciansOnSong(It.IsAny<int>(), It.IsAny<int>())).Returns(musicians);

            // Act
            var musiciansResult = _albumService.GetMusiciansOnSong(albumId, songId);

            // Assert
            Assert.AreEqual(expectedNumberOfMusicians, musiciansResult.Count);
        }

        /*[TestMethod]
        public void AlbumServiceTestUpdateAlbumInfoSuccess()
        {
            // Arrange
            var albumId = 1337;
            var albumFake = Builder<AlbumViewModel>
                .CreateNew()
                .With(x => x.AlbumTitle = "My title")
                .Build();

            _albumRepository.Setup(mock => mock.Update(It.IsAny<media_product_package>()));
            

            // Act
            _albumService.UpdateAlbumInfo(albumId, albumFake);

            // Assert
            _albumRepository.Verify(mock => mock.Update(It.IsAny<media_product_package>()), Times.Once);
        }*/
    }
}
