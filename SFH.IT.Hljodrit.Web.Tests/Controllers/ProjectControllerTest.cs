using System.Net.Http;
using System.Web.Http.Results;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;
using SFH.IT.Hljodrit.Web.Controllers;
using SFH.IT.Hljodrit.Web.Exceptions;

namespace SFH.IT.Hljodrit.Web.Tests.Controllers
{
    [TestClass]
    public class ProjectControllerTest
    {
        private Mock<IProjectService> _projectServiceMock;
        private ProjectController _projectController;

        [TestInitialize]
        public void Initialize()
        {
            _projectServiceMock = new Mock<IProjectService>();
            _projectController = new ProjectController(_projectServiceMock.Object);
        }

        [TestMethod]
        public void CreateProject_WithNumberOfTracksBelowThreshold()
        {
            var project = new ProjectCreationViewModel
            {
                BasicInfo = new ProjectExtendedDto(),
                PublisherId = 1337,
                Songs = Builder<SongWithPerformersDto>.CreateListOfSize(80).Build()
            };

            var result = _projectController.CreateProject(project);

            Assert.IsInstanceOfType(result, typeof(OkResult));
        }

        [TestMethod]
        public void CreateProject_WithNumberOfTracksEqualToThreshold()
        {
            var project = new ProjectCreationViewModel
            {
                BasicInfo = new ProjectExtendedDto(),
                PublisherId = 1337,
                Songs = Builder<SongWithPerformersDto>.CreateListOfSize(100).Build()
            };

            var result = _projectController.CreateProject(project);

            Assert.IsInstanceOfType(result, typeof(OkResult));
        }

        [TestMethod]
        [ExpectedException(typeof(NumberOfTrackExceededException))]
        public void CreateProject_WithNumberOfTracksAboveTreshold()
        {
            var project = new ProjectCreationViewModel
            {
                BasicInfo = new ProjectExtendedDto(),
                PublisherId = 1337,
                Songs = Builder<SongWithPerformersDto>.CreateListOfSize(101).Build()
            };

            var result = _projectController.CreateProject(project);
        }
    }
}
