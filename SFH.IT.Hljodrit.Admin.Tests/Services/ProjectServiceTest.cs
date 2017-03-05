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
        public Mock<IProjectMasterRepository> _projectMasterRepository;
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

            var projectService = new ProjectService(_projectMasterRepository.Object, _unitOfWork);

            // Act
            var projects = projectService.GetAllProjects(pageSize, pageNumber, true, true, true, "");

            // Assert
            Assert.AreEqual(expectedPageSize, projects.Projects.Count());
        }
    }
}
