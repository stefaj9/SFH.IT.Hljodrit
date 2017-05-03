using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Interfaces.Instruments;
using SFH.IT.Hljodrit.Services.Implementations;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
    [TestClass]
    public class InstrumentServiceTest
    {
        private Mock<IInstrumentRepository> _instrumentRepository;
        private Mock<IInstrumentService> _instrumentService;

        [TestInitialize]
        public void TestInitialize()
        {
            _instrumentRepository = new Mock<IInstrumentRepository>();
        }

        [TestMethod]
        public void InstrumentServiceTestGetAllInstrumentsSuccess()
        {
            // Arrange
            var expectedSize = 30;
            var instrumentObjects = Builder<party_instrumenttype>.CreateListOfSize(30).Build();
            _instrumentRepository.Setup(i => i.GetAll()).Returns(instrumentObjects);
            var instrumentService = new InstrumentService(_instrumentRepository.Object);

            // Act
            var instruments = instrumentService.GetAllInstruments();

            // Assert
            Assert.AreEqual(expectedSize, instruments.Count());


        }
    }
}
