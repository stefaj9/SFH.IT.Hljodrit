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
	}
}
