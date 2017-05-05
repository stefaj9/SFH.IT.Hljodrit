using System;
using System.Linq;
using System.Linq.Expressions;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Repositories.Interfaces.Media;
using SFH.IT.Hljodrit.Repositories.Interfaces.Organization;
using SFH.IT.Hljodrit.Services.Implementations;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
    [TestClass]
    public class ProjectServiceTest
    {
        private Mock<IProjectMasterRepository> _projectMasterRepository;
        private Mock<IProjectTrackRepository> _projectTrackRepository;
        private Mock<IProjectTrackArtistRepository> _projectTrackArtistRepository;
        private Mock<IProjectStatusRepository> _projectStatusRepository;
        private Mock<IAlbumRepository> _albumRepository;
        private Mock<IMediaRecordingRepository> _mediaRecordingRepository;
        private Mock<ISongRepository> _songRepository;
        private Mock<IRecordingPartyRepository> _recordingPartyRepository;
        private Mock<IOrganizationIsrcSeriesRepository> _organizationIsrcSeriesRepository;
        private Mock<IOrganizationLabelRepository> _organizationLabelRepository;
        private Mock<IUnitOfWork<HljodritEntitiesDb>> _unitOfWork;
        private IProjectService _projectService;


        [TestInitialize]
        public void TestInitialize()
        {
            _projectMasterRepository = new Mock<IProjectMasterRepository>();
            _projectTrackRepository = new Mock<IProjectTrackRepository>();
            _projectTrackArtistRepository = new Mock<IProjectTrackArtistRepository>();
            _projectStatusRepository = new Mock<IProjectStatusRepository>();
            _albumRepository = new Mock<IAlbumRepository>();
            _mediaRecordingRepository = new Mock<IMediaRecordingRepository>();
            _songRepository = new Mock<ISongRepository>();
            _recordingPartyRepository = new Mock<IRecordingPartyRepository>();
            _organizationIsrcSeriesRepository = new Mock<IOrganizationIsrcSeriesRepository>();
            _organizationLabelRepository = new Mock<IOrganizationLabelRepository>();
            _unitOfWork = new Mock<IUnitOfWork<HljodritEntitiesDb>>();
            _projectService = new ProjectService(_projectMasterRepository.Object, _unitOfWork.Object, _projectTrackRepository.Object, _albumRepository.Object, _mediaRecordingRepository.Object, _songRepository.Object, _recordingPartyRepository.Object, _organizationLabelRepository.Object, _organizationIsrcSeriesRepository.Object, _projectTrackArtistRepository.Object, _projectStatusRepository.Object);
        }

	    #region GetAllProjects tests

	    [TestMethod]
		[ExpectedException(typeof(ArgumentException), "Invalid argument")]
	    public void TestIllegalPageSizeThrowsException()
	    {
			// Act
		    _projectService.GetAllProjects(1000, 1, true, true, true, true, "");
	    }

        [TestMethod]
        public void TestGetAllProjectsWithPagingReturns25Results()
        {
            // Arrange
	        var pageSize = 25;
	        var pageNumber = 1;
	        var expectedPageSize = 25;

            var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
            _projectMasterRepository.Setup(p => p.GetMany(It.IsAny<Expression<Func<project_master, bool>>>()))
                .Returns(masterProjects);

            // Act
            var projects = _projectService.GetAllProjects(pageSize, pageNumber, true, true, true, true, "");

            // Assert
            Assert.AreEqual(expectedPageSize, projects.Objects.Count());
        }

		[TestMethod]
		public void TestGetAllProjectsWithPagingReturns50Results()
		{
			// Arrange
			var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
			_projectMasterRepository.Setup(p => p.GetMany(It.IsAny<Expression<Func<project_master, bool>>>())).Returns(masterProjects);

			const int pageSize = 50;
			const int expectedResultCount = 50;

			// Act
			var projects = _projectService.GetAllProjects(pageSize, 1, true, true, true, true, "");

			// Assert
			Assert.AreEqual(expectedResultCount, projects.Objects.Count());
		}

		[TestMethod]
		public void TestGetAllProjectsWithPagingReturns100Results()
		{
			// Arrange
			var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
			_projectMasterRepository.Setup(p => p.GetMany(It.IsAny<Expression<Func<project_master, bool>>>())).Returns(masterProjects);

			const int pageSize = 100;
			const int expectedResultCount = 100;

			// Act
			var projects = _projectService.GetAllProjects(pageSize, 1, true, true, true, true, "");

			// Assert
			Assert.AreEqual(expectedResultCount, projects.Objects.Count());
		}

        #endregion

        #region MarkProjectAsDeleted
        [TestMethod]
        public void MarkProjectAsDeleted_Success()
        {
            _projectMasterRepository.Setup(pm => pm.GetById(1)).Returns(new project_master
            {
                id = 1,
                removed = false
            });

            Assert.AreEqual(true, _projectService.MarkProjectAsDeleted(1));
        }

        #endregion

        #region GetProjectById

        [TestMethod]
        public void GetProjectById_GivenCorrectId()
        {
            _projectMasterRepository.Setup(pm => pm.GetById(1)).Returns(new project_master
            {
                id = 1
            });

            Assert.IsNotNull(_projectService.GetProjectById(1));
        }

        [TestMethod]
        public void GetProjectById_GivenIncorrectId()
        {
            _projectMasterRepository.Setup(pm => pm.GetById(2)).Returns((project_master)null);

            Assert.IsNull(_projectService.GetProjectById(2));
        }

        #endregion
    }
}
