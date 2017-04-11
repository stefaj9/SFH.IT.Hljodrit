using System.Data.Entity.ModelConfiguration;
using System.Net;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Admin.Controllers;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Tests.Controllers
{
    [TestClass]
    public class SongControllerTest
    {
        private Mock<ISongService> _songServiceMock;
        private SongController _songController;

        [TestInitialize]
        public void Initialize()
        {
            _songServiceMock = new Mock<ISongService>(); 
            _songController = new SongController(_songServiceMock.Object);
        }

        [TestMethod]
        public void UpdateSongMethod_DataValid()
        {
            var status = _songController.UpdateSongById(1, new SongDto
            {
                Title = "Test Title",
                Isrc = "IS-VA-98-00001"
            });

            Assert.IsInstanceOfType(status, typeof(OkNegotiatedContentResult<SongDto>));
        }
    }
}
