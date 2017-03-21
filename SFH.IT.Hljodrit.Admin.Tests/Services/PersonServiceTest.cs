using Microsoft.VisualStudio.TestTools.UnitTesting;
using SFH.IT.Hljodrit.Services.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FizzWare.NBuilder;
using Moq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
	[TestClass]
	public class PersonServiceTest
	{
		private Mock<IPartyRealRepository> _partyRealRepository;
	    private Mock<IPartyRoleRepository> _partyRoleRepository;
	    private Mock<IZipCodeRepository> _zipCodeRepository;
	    private Mock<ICountryRepository> _countryRepository;
	    private Mock<IUnitOfWork> _unitOfWork;
	    private IPersonService _personService;

		private const string ProducerRoleCode = "PRO";

		[TestInitialize]
		public void TestInitialize()
		{
			_partyRealRepository = new Mock<IPartyRealRepository>();
            _partyRoleRepository = new Mock<IPartyRoleRepository>();
            _countryRepository = new Mock<ICountryRepository>();
            _zipCodeRepository = new Mock<IZipCodeRepository>();
            _unitOfWork = new Mock<IUnitOfWork>();
            _personService = new PersonService(_partyRealRepository.Object, _partyRoleRepository.Object, _unitOfWork.Object, _countryRepository.Object, _zipCodeRepository.Object);
        }

		#region GetAllPerformers

		[TestMethod]
		[ExpectedException(typeof(ArgumentException), "Invalid argument")]
		public void TestGetAllPerformersIllegalPageSizeThrowsException()
		{
			// Arrange
			const int illegalPageSize = -1;
			const int pageNumber = 1;

			// Act
			_personService.GetPerformers(illegalPageSize, pageNumber, "");
		}

		[TestMethod]
		public void TestGetAllPerformersWithPagingReturns25Results()
		{
			// Arrange
			const int pageSize = 25;
			const int pageNumber = 1;
			const int expectedPersonCount = 25;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>(), ""))
				.Returns(mockPerformersObject);

			// Act
			var personResults = _personService.GetPerformers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Objects.Count());
		}

		[TestMethod]
		public void TestGetAllPerformersWithPagingReturns50Results()
		{
			// Arrange
			const int pageSize = 50;
			const int pageNumber = 1;
			const int expectedPersonCount = 50;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>(), ""))
				.Returns(mockPerformersObject);

			// Act
			var personResults = _personService.GetPerformers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Objects.Count());
		}

		[TestMethod]
		public void TestGetAllPerformersWithPagingReturns100Results()
		{
			// Arrange
			const int pageSize = 100;
			const int pageNumber = 1;
			const int expectedPersonCount = 100;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>(), ""))
				.Returns(mockPerformersObject);

			// Act
			var personResults = _personService.GetPerformers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Objects.Count());
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

			// Act
			_personService.GetPublishers(illegalPageSize, pageNumber, "");
		}

		[TestMethod]
		public void TestGetAllProducersWithPagingReturns25Results()
		{
			// Arrange
			const int pageSize = 25;
			const int pageNumber = 1;
			const int expectedPersonCount = 25;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>(), ""))
				.Returns(mockPerformersObject);

			// Act
			var personResults = _personService.GetPublishers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Objects.Count());
		}

		[TestMethod]
		public void TestGetAllProducersWithPagingReturns50Results()
		{
			// Arrange
			const int pageSize = 50;
			const int pageNumber = 1;
			const int expectedPersonCount = 50;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>(), ""))
				.Returns(mockPerformersObject);

			// Act
			var personResults = _personService.GetPublishers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Objects.Count());
		}

		[TestMethod]
		public void TestGetAllProducersWithPagingReturns100Results()
		{
			// Arrange
			const int pageSize = 100;
			const int pageNumber = 1;
			const int expectedPersonCount = 100;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>(), ""))
				.Returns(mockPerformersObject);

			// Act
			var personResults = _personService.GetPublishers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Objects.Count());
		}

        #endregion

        #region GetPersonRoles
        [TestMethod]
        public void PersonService_GetAllRoles()
        {
            // Arrange
            var roles = Builder<party_partyroletype>.CreateListOfSize(20).Build();
            _partyRoleRepository.Setup(pr => pr.GetMany(p => p.active == true)).Returns(roles);
            // Act
            var returnedRoles = _personService.GetPersonRoles();

            // Assert
            Assert.IsNotNull(returnedRoles);
            Assert.IsInstanceOfType(returnedRoles, typeof(IEnumerable<RoleDto>));
            Assert.AreEqual(20, returnedRoles.Count());
        }
        #endregion

        #region AddPerson

	    public void AddAPersonWithRightFormattedData()
	    {

	    }

	    public void AddAPersonWithNameMissing()
	    {
	        
	    }

	    public void AddAPersonWithAddressMissing()
	    {
	        
	    }

	    public void AddAPersonWithIncorrectSsnFormat()
	    {
	        
	    }

	    public void AddAPersonWithTooShortName()
	    {
	        
	    }
        #endregion
    }
}