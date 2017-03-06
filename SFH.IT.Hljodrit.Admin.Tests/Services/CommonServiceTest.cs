using System.Collections.Generic;
using System.Linq;
using FizzWare.NBuilder;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;
using SFH.IT.Hljodrit.Services.Implementations;

namespace SFH.IT.Hljodrit.Admin.Tests.Services
{
    [TestClass]
    public class CommonServiceTest
    {
        private Mock<IZipCodeRepository> _zipCodeRepository;
        private Mock<ICountryRepository> _countryRepository;

        [TestInitialize]
        public void Initialize()
        {
            _zipCodeRepository = new Mock<IZipCodeRepository>();
            _countryRepository = new Mock<ICountryRepository>();
        }

        [TestMethod]
        public void GetAllZipCodesReturningAListOfZipCodeDto()
        {
            // Arrange
            var zipCodes = Builder<common_zipcodes>.CreateListOfSize(50).Build();
            _zipCodeRepository.Setup(zc => zc.GetAll()).Returns(zipCodes);
            var commonService = new CommonService(_zipCodeRepository.Object, _countryRepository.Object);
            // Act
            var result = commonService.GetAllZipCodes();
            // Assert
            Assert.IsInstanceOfType(result, typeof(IEnumerable<ZipCodeDto>));
            Assert.IsNotNull(result);
            Assert.AreEqual(50, result.Count());
        }

        [TestMethod]
        public void GetAllCountriesReturnsAListOfCountryDto()
        {
            // Arrange
            var countries = Builder<common_country>.CreateListOfSize(50).Build();
            _countryRepository.Setup(c => c.GetAll()).Returns(countries);
            var commonService = new CommonService(_zipCodeRepository.Object, _countryRepository.Object);

            // Act
            var result = commonService.GetAllCountries();

            // Assert
            Assert.IsInstanceOfType(result, typeof(IEnumerable<CountryDto>));
            Assert.IsNotNull(result);
            Assert.AreEqual(50, result.Count());
        }
    }
}
