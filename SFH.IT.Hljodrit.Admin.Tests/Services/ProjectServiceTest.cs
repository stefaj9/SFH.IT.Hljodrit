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
			var projectService = new ProjectService(_projectMasterRepository.Object, _unitOfWork);
			// Act
		    projectService.GetAllProjects(1000, 1, true, true, true, "");
	    }

		[TestMethod]
        public void TestGetAllProjectsWithPagingReturns25Results()
        {
            // Arrange
	        var query = "";
	        var masterProjects = Builder<project_master>.CreateListOfSize(100).All().With(p => p.removed = false).Build();
            _projectMasterRepository.Setup(p => p.GetMany(It.IsAny<Expression<Func<project_master, bool>>>())).Returns(masterProjects);

            var projectService = new ProjectService(_projectMasterRepository.Object, _unitOfWork);

			const int pageSize = 25;
			const int expectedResultCount = 25;

			// Act
			var projects = projectService.GetAllProjects(pageSize, 1, true, true, true, "");

            // Assert
            Assert.AreEqual(expectedResultCount, projects.Projects.Count());
        }

		[TestMethod]
		public void TestGetAllProjectsWithPagingReturns50Results()
		{
			// Arrange
			var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
			_projectMasterRepository.Setup(p => p.GetMany(It.IsAny<Expression<Func<project_master, bool>>>())).Returns(masterProjects);

			var projectService = new ProjectService( _projectMasterRepository.Object, _unitOfWork);

			const int pageSize = 50;
			const int expectedResultCount = 50;

			// Act
			var projects = projectService.GetAllProjects(pageSize, 1, true, true, true, "");

			// Assert
			Assert.AreEqual(expectedResultCount, projects.Projects.Count());
		}

		[TestMethod]
		public void TestGetAllProjectsWithPagingReturns100Results()
		{
			// Arrange
			var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
			_projectMasterRepository.Setup(p => p.GetMany(It.IsAny<Expression<Func<project_master, bool>>>())).Returns(masterProjects);

			var projectService = new ProjectService( _projectMasterRepository.Object, _unitOfWork);

			const int pageSize = 100;
			const int expectedResultCount = 100;

			// Act
			var projects = projectService.GetAllProjects(pageSize, 1, true, true, true, "");

			// Assert
			Assert.AreEqual(expectedResultCount, projects.Projects.Count());
		}

		#endregion
	}
}
