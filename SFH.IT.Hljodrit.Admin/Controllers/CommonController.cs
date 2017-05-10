using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/common")]
    public class CommonController : ApiController
    {
        private readonly ICommonService _commonService;

        public CommonController(ICommonService commonService)
        {
            _commonService = commonService;
        }

        [Route("zipcodes")]
        public IHttpActionResult GetZipCodes()
        {
            return Ok(_commonService.GetAllZipCodes());
        }

        [Route("countries")]
        public IHttpActionResult GetCountries()
        {
            return Ok(_commonService.GetAllCountries());
        }
    }
}
