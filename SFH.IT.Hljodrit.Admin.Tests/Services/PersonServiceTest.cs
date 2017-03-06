using System.Collections.Generic;
using System.Linq;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
using SFH.IT.Hljodrit.Services.Implementations;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
    [TestClass]
    public class PersonServiceTest
    {
        private Mock<IPartyRealRepository> _partyRealRepository;
        private Mock<IPartyRoleRepository> _partyRoleRepository;

        [TestInitialize]
        public void Initialize()
        {
            _partyRoleRepository = new Mock<IPartyRoleRepository>();
            _partyRealRepository = new Mock<IPartyRealRepository>();
        }

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
    }
}
