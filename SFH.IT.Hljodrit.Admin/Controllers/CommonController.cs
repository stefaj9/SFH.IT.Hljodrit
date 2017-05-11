using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    /// <summary>
    /// Common controller features various operations that are common between services.
    /// </summary>
    [RoutePrefix("api/common")]
    public class CommonController : ApiController
    {
        private readonly ICommonService _commonService;

        public CommonController(ICommonService commonService)
        {
            _commonService = commonService;
        }

        /// <summary>
        /// Returns the zip codes that are available in the system.
        /// </summary>
        /// <returns>An IEnumerable containing all available zip codes in the system.</returns>
        [Route("zipcodes")]
        public IHttpActionResult GetZipCodes()
        {
            return Ok(_commonService.GetAllZipCodes());
        }

        /// <summary>
        /// Returns all available countries that are registered in the system.
        /// </summary>
        /// <returns>An IEnumerable containing all registered countries in the system.</returns>
        [Route("countries")]
        public IHttpActionResult GetCountries()
        {
            return Ok(_commonService.GetAllCountries());
        }
    }
}
