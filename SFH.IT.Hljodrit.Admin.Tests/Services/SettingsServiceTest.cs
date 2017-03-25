using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Interfaces.Settings;
using SFH.IT.Hljodrit.Services.Implementations;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
	[TestClass]
	public class SettingsServiceTest
	{
		private Mock<ISettingsRepository> _settingsRepository;

		[TestInitialize]
		public void TestInitialize()
		{
			_settingsRepository = new Mock<ISettingsRepository>();
		}

        [TestMethod]
        [ExpectedException(typeof(ArgumentException), "Invalid argument")]
        public void TestGetAllExceptionsIllegalPageSizeThrowsException()
        {
            // Arrange
            const int pageSize = 101;
            const int pageNumber = 1;

            var settingsService = new SettingsService(_settingsRepository.Object);

            // Act
            var exceptionResults = settingsService.GetAllExceptions(pageSize, pageNumber);
        }

        [TestMethod]
		public void TestGetAllExceptionsReturns25Results()
		{
			// Arrange
			const int pageSize = 25;
			const int pageNumber = 1;
			const int expectedExceptionCount = 25;

			var mockExceptionObjects = Builder<NLog>.CreateListOfSize(100).Build();
			_settingsRepository.Setup(ex => ex.GetAll()).Returns(mockExceptionObjects);

			var settingsService = new SettingsService(_settingsRepository.Object);

			// Act
			var exceptionResults = settingsService.GetAllExceptions(pageSize, pageNumber);

			// Assert
			Assert.AreEqual(expectedExceptionCount, exceptionResults.Objects.Count());
		}

        [TestMethod]
        public void TestGetAllExceptionsReturns50Results()
        {
            // Arrange
            const int pageSize = 50;
            const int pageNumber = 1;
            const int expectedExceptionCount = 50;

            var mockExceptionObjects = Builder<NLog>.CreateListOfSize(100).Build();
            _settingsRepository.Setup(ex => ex.GetAll()).Returns(mockExceptionObjects);

            var settingsService = new SettingsService(_settingsRepository.Object);

            // Act
            var exceptionResults = settingsService.GetAllExceptions(pageSize, pageNumber);

            // Assert
            Assert.AreEqual(expectedExceptionCount, exceptionResults.Objects.Count());
        }

        [TestMethod]
        public void TestGetAllExceptionsReturns100Results()
        {
            // Arrange
            const int pageSize = 100;
            const int pageNumber = 1;
            const int expectedExceptionCount = 100;

            var mockExceptionObjects = Builder<NLog>.CreateListOfSize(100).Build();
            _settingsRepository.Setup(ex => ex.GetAll()).Returns(mockExceptionObjects);

            var settingsService = new SettingsService(_settingsRepository.Object);

            // Act
            var exceptionResults = settingsService.GetAllExceptions(pageSize, pageNumber);

            // Assert
            Assert.AreEqual(expectedExceptionCount, exceptionResults.Objects.Count());
        }
    }
}
