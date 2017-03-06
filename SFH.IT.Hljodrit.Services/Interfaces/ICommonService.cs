using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface ICommonService
    {
        IEnumerable<ZipCodeDto> GetAllZipCodes();
        IEnumerable<CountryDto> GetAllCountries();
    }
}
