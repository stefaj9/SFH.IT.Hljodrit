using Microsoft.VisualStudio.TestTools.UnitTesting;
using SFH.IT.Hljodrit.Services.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FizzWare.NBuilder;
using Moq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Performers;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
	[TestClass]
	public class PersonServiceTests
	{
		private Mock<IPartyRealRepository> _partyRealRepository;

		private const string ProducerRoleCode = "PRO";

		[TestInitialize]
		public void TestInitialize()
		{
			_partyRealRepository = new Mock<IPartyRealRepository>();
		}

		#region GetAllPerformers

		[TestMethod]
		[ExpectedException(typeof(ArgumentException), "Invalid argument")]
		public void TestGetAllPerformersIllegalPageSizeThrowsException()
		{
			// Arrange
			const int illegalPageSize = -1;
			const int pageNumber = 1;
			var projectService = new PersonService(_partyRealRepository.Object);
			// Act
			projectService.GetAllPerformers(illegalPageSize, pageNumber);
		}

		[TestMethod]
		public void TestGetAllPerformersWithPagingReturns25Results()
		{
			// Arrange
			const int pageSize = 25;
			const int pageNumber = 1;
			const int expectedPersonCount = 25;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetAllPersons(p => p.rolecode != ProducerRoleCode))
				.Returns(mockPerformersObject);

			var personService = new PersonService(_partyRealRepository.Object);

			// Act
			var personResults = personService.GetAllPerformers(pageSize, pageNumber);

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Persons.Count());
		}

		#endregion

		#region GetAllProducers

		[TestMethod]
		[ExpectedException(typeof(ArgumentException), "Invalid argument")]
		public void TestGetAllProducersIllegalPageSizeThrowsException()
		{
			// Arrange
			const int illegalPageSize = -1;
			const int pageNumber = 1;
			var projectService = new PersonService(_partyRealRepository.Object);
			// Act
			projectService.GetAllProducers(illegalPageSize, pageNumber);
		}

		[TestMethod]
		public void TestGetAllProducersWithPagingReturns25Results()
		{
			// Arrange
			const int pageSize = 25;
			const int pageNumber = 1;
			const int expectedPersonCount = 25;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetAllPersons(p => p.rolecode == ProducerRoleCode))
				.Returns(mockPerformersObject);

			var personService = new PersonService(_partyRealRepository.Object);

			// Act
			var personResults = personService.GetAllProducers(pageSize, pageNumber);

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Persons.Count());
		}

		#endregion
	}
}