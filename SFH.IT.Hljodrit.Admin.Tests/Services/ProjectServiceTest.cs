using System.Linq;
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
            _projectMasterRepository = new Mock<IProjectMasterRepository>(MockBehavior.Loose);
        }

        [TestMethod]
        public void TestGetAllProjectsWithPagingReturnsResults()
        {
            // Arrange
            var masterProjects = Builder<project_master>.CreateListOfSize(100).Build();
            _projectMasterRepository.Setup(p => p.GetAll())
                .Returns(masterProjects);

            var projectService = new ProjectService(_projectMasterRepository.Object, _unitOfWork);

            // Act
            var projects = projectService.GetAllProjects(25, 1, true, true, true, "");

            // Assert
            Assert.AreEqual(25, projects.Projects.Count());
        }
    }
}
