using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using FizzWare.NBuilder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Services.Implementations;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
	[TestClass]
	public class SongServiceTest
	{
		private Mock<ISongRepository> _songRepository;

		[TestInitialize]
		public void TestInitialize()
		{
			_songRepository = new Mock<ISongRepository>();
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

			var songService = new SongService(_songRepository.Object);
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

			var songService = new SongService(_songRepository.Object);
			// Act
			var songResult = songService.GetSongById(expectedId);
			// Assert
			Assert.AreEqual(expectedId, songResult.Id);
		}
		#endregion
	}
}
