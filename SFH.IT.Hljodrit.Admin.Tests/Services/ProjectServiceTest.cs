using System;
<<<<<<< HEAD
using Microsoft.VisualStudio.TestTools.UnitTesting;
=======
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
>>>>>>> 71ae455b876e453b2c8b853ec6384722ce715223

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
    [TestClass]
    public class ProjectServiceTest
    {
<<<<<<< HEAD
        [TestInitialize]
        public void Initialize()
        {
            
        }
        [TestMethod]
        public void TestMethod1()
        {

=======
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

            var projectService = new ProjectService(_projectUserRepository, _projectTrackRepository, _projectTrackArtistRepository,
                _projectStatusRepository, _projectMasterRepository.Object, _unitOfWork);

            // Act
            var projects = projectService.GetAllProjects(25, 1, true, true, true);

            // Assert
            Assert.AreEqual(25, projects.Projects.Count());
>>>>>>> 71ae455b876e453b2c8b853ec6384722ce715223
        }
    }
}
