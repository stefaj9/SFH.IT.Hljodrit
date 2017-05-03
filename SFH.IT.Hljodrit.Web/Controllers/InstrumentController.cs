using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/instruments")]
    public class InstrumentController : ApiController
    {
        private readonly IInstrumentService _instrumentService;

        public InstrumentController(IInstrumentService instrumentService)
        {
            _instrumentService = instrumentService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllInstruments()
        {
            return Ok(_instrumentService.GetAllInstruments());
        }
    }
}