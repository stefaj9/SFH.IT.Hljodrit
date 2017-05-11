using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    /// <summary>
    /// Used for common functions such as getting zip codes, country codes, etc.
    /// </summary>
    [Authorize]
    [RoutePrefix("api/common")]
    public class CommonController : ApiController
    {
        private readonly ICommonService _commonService;

        public CommonController(ICommonService commonService)
        {
            _commonService = commonService;
        }
        /// <summary>
        /// This method is used to retrieve the available zip codes within the system.
        /// </summary>
        /// <returns>An IEnumerable with all the zip codes encapsulated inside an ZipCodeDto</returns>
        [Route("zipcodes")]
        public IHttpActionResult GetZipCodes()
        {
            return Ok(_commonService.GetAllZipCodes());
        }
        /// <summary>
        /// This method is used to retrieve the available countries within the system.
        /// </summary>
        /// <returns>An IEnumerable with all country encapsulated inside an CountryDto</returns>
        [Route("countries")]
        public IHttpActionResult GetCountries()
        {
            return Ok(_commonService.GetAllCountries());
        }
    }
}
