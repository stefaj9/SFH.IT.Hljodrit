using System;
using System.Linq;
using System.Linq.Expressions;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
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

        private Mock<IUnitOfWork> _unitOfWork;


        [TestInitialize]
        public void TestInitialize()
        {
            _projectMasterRepository = new Mock<IProjectMasterRepository>();
            _unitOfWork = new Mock<IUnitOfWork>();
        }

	    #region GetAllProjects tests

	    [TestMethod]
		[ExpectedException(typeof(ArgumentException), "Invalid argument")]
	    public void TestIllegalPageSizeThrowsException()
	    {
			// Arrange
			var projectService = new ProjectService(_projectMasterRepository.Object, _unitOfWork.Object);
			// Act
		    projectService.GetAllProjects(1000, 1, true, true, true, "");
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

            var projectService = new ProjectService(_projectMasterRepository.Object, _unitOfWork.Object);

            // Act
            var projects = projectService.GetAllProjects(pageSize, pageNumber, true, true, true, "");

            // Assert
            Assert.AreEqual(expectedPageSize, projects.Objects.Count());
        }

		[TestMethod]
		public void TestGetAllProjectsWithPagingReturns50Results()
		{
			// Arrange
			var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
			_projectMasterRepository.Setup(p => p.GetMany(It.IsAny<Expression<Func<project_master, bool>>>())).Returns(masterProjects);

			var projectService = new ProjectService( _projectMasterRepository.Object, _unitOfWork.Object);

			const int pageSize = 50;
			const int expectedResultCount = 50;

			// Act
			var projects = projectService.GetAllProjects(pageSize, 1, true, true, true, "");

			// Assert
			Assert.AreEqual(expectedResultCount, projects.Objects.Count());
		}

		[TestMethod]
		public void TestGetAllProjectsWithPagingReturns100Results()
		{
			// Arrange
			var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
			_projectMasterRepository.Setup(p => p.GetMany(It.IsAny<Expression<Func<project_master, bool>>>())).Returns(masterProjects);

			var projectService = new ProjectService( _projectMasterRepository.Object, _unitOfWork.Object);

			const int pageSize = 100;
			const int expectedResultCount = 100;

			// Act
			var projects = projectService.GetAllProjects(pageSize, 1, true, true, true, "");

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
            var projectService = new ProjectService(_projectMasterRepository.Object, _unitOfWork.Object);

            Assert.AreEqual(true, projectService.MarkProjectAsDeleted(1));
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

            var projectService = new ProjectService(_projectMasterRepository.Object, _unitOfWork.Object);

            Assert.IsNotNull(projectService.GetProjectById(1));
        }

        [TestMethod]
        public void GetProjectById_GivenIncorrectId()
        {
            _projectMasterRepository.Setup(pm => pm.GetById(2)).Returns((project_master)null);

            var projectService = new ProjectService(_projectMasterRepository.Object, _unitOfWork.Object);

            Assert.IsNull(projectService.GetProjectById(2));
        }

        #endregion
    }
}
