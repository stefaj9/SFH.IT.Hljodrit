using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SFH.IT.Hljodrit.Services.Interfaces;
using Moq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Services.Implementations;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
    [TestClass]
    public class ProjectServiceTest
    {
        private Mock<IProjectMasterRepository> _projectMasterRepository;
        private IProjectTrackRepository _projectTrackRepository;
        private IProjectTrackArtistRepository _projectTrackArtistRepository;
        private IProjectStatusRepository _projectStatusRepository;
        private IProjectUserRepository _projectUserRepository;

        private IUnitOfWork _unitOfWork;


        [TestInitialize]
        public void TestInitialize()
        {
            _projectMasterRepository = new Mock<IProjectMasterRepository>();
        }

	    #region GetAllProjects tests

	    [TestMethod]
		[ExpectedException(typeof(ArgumentException), "Invalid argument")]
	    public void TestIllegalPageSizeThrowsException()
	    {
			// Arrange
			var projectService = new ProjectService(_projectUserRepository, _projectTrackRepository, _projectTrackArtistRepository,
				_projectStatusRepository, _projectMasterRepository.Object, _unitOfWork);
			// Act
		    projectService.GetAllProjects(1000, 1, true, true, true);
	    }

		[TestMethod]
        public void TestGetAllProjectsWithPagingReturns25Results()
        {
            // Arrange
            var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
            _projectMasterRepository.Setup(p => p.GetAll()).Returns(masterProjects);

            var projectService = new ProjectService(_projectUserRepository, _projectTrackRepository, _projectTrackArtistRepository,
                _projectStatusRepository, _projectMasterRepository.Object, _unitOfWork);

			const int pageSize = 25;
			const int expectedResultCount = 25;

			// Act
			var projects = projectService.GetAllProjects(pageSize, 1, true, true, true);

            // Assert
            Assert.AreEqual(expectedResultCount, projects.Projects.Count());
        }

		[TestMethod]
		public void TestGetAllProjectsWithPagingReturns50Results()
		{
			// Arrange
			var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
			_projectMasterRepository.Setup(p => p.GetAll()).Returns(masterProjects);

			var projectService = new ProjectService(_projectUserRepository, _projectTrackRepository, _projectTrackArtistRepository,
				_projectStatusRepository, _projectMasterRepository.Object, _unitOfWork);

			const int pageSize = 50;
			const int expectedResultCount = 50;

			// Act
			var projects = projectService.GetAllProjects(pageSize, 1, true, true, true);

			// Assert
			Assert.AreEqual(expectedResultCount, projects.Projects.Count());
		}

		[TestMethod]
		public void TestGetAllProjectsWithPagingReturns100Results()
		{
			// Arrange
			var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
			_projectMasterRepository.Setup(p => p.GetAll()).Returns(masterProjects);

			var projectService = new ProjectService(_projectUserRepository, _projectTrackRepository, _projectTrackArtistRepository,
				_projectStatusRepository, _projectMasterRepository.Object, _unitOfWork);

			const int pageSize = 100;
			const int expectedResultCount = 100;

			// Act
			var projects = projectService.GetAllProjects(pageSize, 1, true, true, true);

			// Assert
			Assert.AreEqual(expectedResultCount, projects.Projects.Count());
		}

		#endregion
	}
}
