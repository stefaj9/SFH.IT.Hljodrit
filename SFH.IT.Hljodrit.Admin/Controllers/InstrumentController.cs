using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
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
            // TODO: Possibly add paging
            return Ok(_instrumentService.GetAllInstruments());
        }
    }
}