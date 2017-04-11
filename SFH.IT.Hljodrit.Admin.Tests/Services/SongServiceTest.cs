using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using FizzWare.NBuilder;
using System;
using System.Linq;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Services.Implementations;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Instruments;
using SFH.IT.Hljodrit.Repositories.Interfaces.Media;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
	[TestClass]
	public class SongServiceTest
	{
		private Mock<ISongRepository> _songRepository;
	    private Mock<IRecordingPartyRepository> _recordingPartyRepository;
	    private Mock<IInstrumentRepository> _instrumentRepository;
	    private Mock<IMediaRecordingRepository> _mediaRecordingRepository;
	    private Mock<IUnitOfWork> _unitOfWork;

		[TestInitialize]
		public void TestInitialize()
		{
			_songRepository = new Mock<ISongRepository>();
            _unitOfWork = new Mock<IUnitOfWork>();
            _recordingPartyRepository = new Mock<IRecordingPartyRepository>();
            _instrumentRepository = new Mock<IInstrumentRepository>();
            _mediaRecordingRepository = new Mock<IMediaRecordingRepository>();
        }

		#region GetSongs tests

		[TestMethod]
		public void TestGetSongsWithNoSearchTermReturns25Results()
		{
			// Arrange
			var pageSize = 25;
			var pageNumber = 1;
			var expectedObjectCount = 25;

			var songs = Builder<SongDto>.CreateListOfSize(25).Build();
			_songRepository.Setup(s => s.GetSongs(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>(), It.IsAny<Expression<Func<SongDto, bool>>>()))
				.Returns(new Envelope<SongDto>
				{
					CurrentPage = 1,
					MaximumPage = 4,
					Objects = songs
				});

			var songService = new SongService(_songRepository.Object, _recordingPartyRepository.Object, _unitOfWork.Object, _instrumentRepository.Object, _mediaRecordingRepository.Object);
			// Act
			var songResultEnvelope = songService.GetSongs(pageSize, pageNumber, "", "");

			// Assert
			Assert.AreEqual(songResultEnvelope.Objects.Count(), expectedObjectCount);
		}

		#endregion

		#region GetSongById tests
		[TestMethod]
		public void TestGetSongByIdExists()
		{
			// Arrange
			var expectedId = 1337;
			var song = Builder<media_product>
				.CreateNew()
				.With(x => x.id = 1337)
				.Build();

			_songRepository.Setup(s => s.GetById(It.IsAny<int>())).Returns(song);

			var songService = new SongService(_songRepository.Object, _recordingPartyRepository.Object, _unitOfWork.Object, _instrumentRepository.Object, _mediaRecordingRepository.Object);
			// Act
			var songResult = songService.GetSongById(expectedId);
			// Assert
			Assert.AreEqual(expectedId, songResult.Id);
		}
        #endregion

	    #region UpdateSong
        [TestMethod]
	    public void TestUpdateSongSuccess()
	    {
	        _mediaRecordingRepository.Setup(m => m.GetById(1)).Returns(new media_recording
	        {
	            id = 1,
                isrc = "IS-VA-96-00001",
                recordingtitle = "Test 1",
                workingtitle = "Test 1",
                recordingcountrycode = 354,
                statusid = 4,
                updatedby = "Test",
                updatedon = DateTime.Now,
                createdby = "Test",
                createdon = DateTime.Now,
                markedfordeletion = false
	        });
	        _songRepository.Setup(s => s.GetById(1)).Returns(new media_product
	        {
	            id = 1,
                tracknumber = 1,
                isrc = "IS-VA-96-00001",
                recordingid = 1,
                title = "Test",
                updatedon = DateTime.Now,
                updatedby = "Test",
                createdon = DateTime.Now,
                createdby = "Test"
            });

            var songService = new SongService(_songRepository.Object, _recordingPartyRepository.Object, _unitOfWork.Object, _instrumentRepository.Object, _mediaRecordingRepository.Object);

	        var song = songService.UpdateSongById(1, new SongExtendedDto
	        {
                Title = "Test",
	            Isrc = "IS-VA-96-000002"
	        });

	        Assert.AreEqual(song.Isrc, "IS-VA-96-000002");
	    }

	    #endregion
    }
}
