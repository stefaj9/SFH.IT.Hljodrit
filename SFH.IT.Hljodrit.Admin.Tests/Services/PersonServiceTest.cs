﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using SFH.IT.Hljodrit.Services.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FizzWare.NBuilder;
using Moq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
	[TestClass]
	public class PersonServiceTest
	{
		private Mock<IPartyRealRepository> _partyRealRepository;
	    private Mock<IPartyRoleRepository> _partyRoleRepository;

		private const string ProducerRoleCode = "PRO";

		[TestInitialize]
		public void TestInitialize()
		{
			_partyRealRepository = new Mock<IPartyRealRepository>();
            _partyRoleRepository = new Mock<IPartyRoleRepository>();
		}

		#region GetAllPerformers

		[TestMethod]
		[ExpectedException(typeof(ArgumentException), "Invalid argument")]
		public void TestGetAllPerformersIllegalPageSizeThrowsException()
		{
			// Arrange
			const int illegalPageSize = -1;
			const int pageNumber = 1;
			var projectService = new PersonService(_partyRealRepository.Object, _partyRoleRepository.Object);

			// Act
			projectService.GetAllPerformers(illegalPageSize, pageNumber, "");
		}

		[TestMethod]
		public void TestGetAllPerformersWithPagingReturns25Results()
		{
			// Arrange
			const int pageSize = 25;
			const int pageNumber = 1;
			const int expectedPersonCount = 25;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetAllPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>()))
				.Returns(mockPerformersObject);

			var personService = new PersonService(_partyRealRepository.Object, _partyRoleRepository.Object);

			// Act
			var personResults = personService.GetAllPerformers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Persons.Count());
		}

		[TestMethod]
		public void TestGetAllPerformersWithPagingReturns50Results()
		{
			// Arrange
			const int pageSize = 50;
			const int pageNumber = 1;
			const int expectedPersonCount = 50;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetAllPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>()))
				.Returns(mockPerformersObject);

			var personService = new PersonService(_partyRealRepository.Object, _partyRoleRepository.Object);

			// Act
			var personResults = personService.GetAllPerformers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Persons.Count());
		}

		[TestMethod]
		public void TestGetAllPerformersWithPagingReturns100Results()
		{
			// Arrange
			const int pageSize = 100;
			const int pageNumber = 1;
			const int expectedPersonCount = 100;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetAllPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>()))
				.Returns(mockPerformersObject);

			var personService = new PersonService(_partyRealRepository.Object, _partyRoleRepository.Object);

			// Act
			var personResults = personService.GetAllPerformers(pageSize, pageNumber, "");

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

			var projectService = new PersonService(_partyRealRepository.Object, _partyRoleRepository.Object);
			// Act
			projectService.GetAllProducers(illegalPageSize, pageNumber, "");
		}

		[TestMethod]
		public void TestGetAllProducersWithPagingReturns25Results()
		{
			// Arrange
			const int pageSize = 25;
			const int pageNumber = 1;
			const int expectedPersonCount = 25;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetAllPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>()))
				.Returns(mockPerformersObject);

			var personService = new PersonService(_partyRealRepository.Object, _partyRoleRepository.Object);

			// Act
			var personResults = personService.GetAllProducers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Persons.Count());
		}

		[TestMethod]
		public void TestGetAllProducersWithPagingReturns50Results()
		{
			// Arrange
			const int pageSize = 50;
			const int pageNumber = 1;
			const int expectedPersonCount = 50;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetAllPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>()))
				.Returns(mockPerformersObject);

			var personService = new PersonService(_partyRealRepository.Object, _partyRoleRepository.Object);

			// Act
			var personResults = personService.GetAllProducers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Persons.Count());
		}

		[TestMethod]
		public void TestGetAllProducersWithPagingReturns100Results()
		{
			// Arrange
			const int pageSize = 100;
			const int pageNumber = 1;
			const int expectedPersonCount = 100;

			var mockPerformersObject = Builder<PersonDto>.CreateListOfSize(100).Build();
			_partyRealRepository.Setup(person => person.GetAllPersons(It.IsAny<Expression<Func<project_track_artist, bool>>>()))
				.Returns(mockPerformersObject);

			var personService = new PersonService(_partyRealRepository.Object, _partyRoleRepository.Object);

			// Act
			var personResults = personService.GetAllProducers(pageSize, pageNumber, "");

			// Assert
			Assert.AreEqual(expectedPersonCount, personResults.Persons.Count());
		}

        #endregion

        #region GetPersonRoles
        [TestMethod]
        public void PersonService_GetAllRoles()
        {
            // Arrange
            var roles = Builder<party_partyroletype>.CreateListOfSize(20).Build();
            _partyRoleRepository.Setup(pr => pr.GetMany(p => p.active == true)).Returns(roles);
            var personService = new PersonService(_partyRealRepository.Object, _partyRoleRepository.Object);

            // Act
            var returnedRoles = personService.GetPersonRoles();

            // Assert
            Assert.IsNotNull(returnedRoles);
            Assert.IsInstanceOfType(returnedRoles, typeof(IEnumerable<RoleDto>));
            Assert.AreEqual(20, returnedRoles.Count());
        }
        #endregion
    }
}