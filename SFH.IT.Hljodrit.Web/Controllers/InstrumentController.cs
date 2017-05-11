using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    /// <summary>
    /// Used to perform actions based on instruments
    /// </summary>
    [Authorize]
    [RoutePrefix("api/instruments")]
    public class InstrumentController : ApiController
    {
        private readonly IInstrumentService _instrumentService;

        public InstrumentController(IInstrumentService instrumentService)
        {
            _instrumentService = instrumentService;
        }

        /// <summary>
        /// Is used to retrieve all instruments within the system
        /// </summary>
        /// <returns>An IEnumerable of instruments encapsulated as InstrumentDto</returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllInstruments()
        {
            return Ok(_instrumentService.GetAllInstruments());
        }
    }
}