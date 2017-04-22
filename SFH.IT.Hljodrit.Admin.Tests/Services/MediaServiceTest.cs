using System;
using System.Linq;
using System.Linq.Expressions;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.StaticHelperClasses;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Services.Implementations;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
    [TestClass]
    public class MediaServiceTest
    {
        private Mock<IMediaRecordingRepository> _mediaRecordingRepositoryMock;
        private IMediaService _mediaService;
        [TestInitialize]
        public void Initialize()
        {
            _mediaRecordingRepositoryMock = new Mock<IMediaRecordingRepository>();
            _mediaService = new MediaService(_mediaRecordingRepositoryMock.Object);
        }
        [TestMethod]
        public void MediaService_GetAllMedia_NoFilter()
        {
            var mediaRecordings = Builder<MediaDto>.CreateListOfSize(25).Build();
            _mediaRecordingRepositoryMock.Setup(
                    m => m.GetAllMedia(1, 25, "", It.IsAny<Expression<Func<media_recording, bool>>>()))
                .Returns(EnvelopeCreator.CreateEnvelope(mediaRecordings, 25, 1, 200));

            var result = _mediaService.GetAllMedia(1, 25, "", "name");

            Assert.AreEqual(25, result.Objects.Count());
        }
    }
}
