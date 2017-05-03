using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
using SFH.IT.Hljodrit.Services.Implementations;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
    [TestClass]
    public class MainArtistServiceTest
    {
        private Mock<IPartyMainArtistRepository> _partyMainArtistRepository;
        private Mock<IPartyRealRepository> _partyRealRepository;
        private Mock<IUnitOfWork<HljodritEntities>> _unitOfWork;
        private Mock<IPersonService> _personService;
        private IMainArtistService _mainArtistService;

        [TestInitialize]
        public void TestInitialize()
        {
            _partyMainArtistRepository = new Mock<IPartyMainArtistRepository>();
            _partyRealRepository = new Mock<IPartyRealRepository>();
            _unitOfWork = new Mock<IUnitOfWork<HljodritEntities>>();

            _personService = new Mock<IPersonService>();

            _mainArtistService = new MainArtistService(_partyMainArtistRepository.Object, 
                _partyRealRepository.Object, _personService.Object, _unitOfWork.Object);
        }

        [TestMethod]
        public void MainArtistServiceTestGetMainArtistByCriteriaSuccess()
        {
            // Arrange
            var pageNumber = 1;
            var pageSize = 25;
            var searchString = "";
            var mainArtistObjects = Builder<party_mainartist>.CreateListOfSize(30).Build();
            _partyMainArtistRepository.Setup(p => p.GetMany(It.IsAny<Expression<Func<party_mainartist, bool>>>())).Returns(mainArtistObjects);

            // Act
            var results = _mainArtistService.GetMainArtistByCriteria(pageSize, pageNumber, searchString);

            // Assert
            Assert.AreEqual(25, results.Objects.Count());
        }
    }
}
