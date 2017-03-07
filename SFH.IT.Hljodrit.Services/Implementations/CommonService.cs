using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Common;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class CommonService : ICommonService
    {
        private readonly IZipCodeRepository _zipCodeRepository;
        private readonly ICountryRepository _countryRepository;

        public CommonService(IZipCodeRepository zipCodeRepository, ICountryRepository countryRepository)
        {
            _zipCodeRepository = zipCodeRepository;
            _countryRepository = countryRepository;
        }

        public IEnumerable<ZipCodeDto> GetAllZipCodes()
        {
            return _zipCodeRepository.GetAll().Select(zc => new ZipCodeDto
            {
                Code = zc.zipcode,
                Area = zc.areaname
            });
        }

        public IEnumerable<CountryDto> GetAllCountries()
        {
            return _countryRepository.GetAll().Select(c => new CountryDto
            {
                NumericIsoCode = c.numericisocode,
                Name = c.name_is
            });
        }
    }
}
