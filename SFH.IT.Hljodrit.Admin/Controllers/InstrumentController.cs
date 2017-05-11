using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    /// <summary>
    /// Handles operations regarding all registered instruments in the system.
    /// </summary>
    [RoutePrefix("api/instruments")]
    public class InstrumentController : ApiController
    {
        private readonly IInstrumentService _instrumentService;

        public InstrumentController(IInstrumentService instrumentService)
        {
            _instrumentService = instrumentService;
        }

        /// <summary>
        /// Gets all registered instruments in the system.
        /// </summary>
        /// <returns>An IEnumerable containing all registered instruments in the system.</returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllInstruments()
        {
            // TODO: Possibly add paging
            return Ok(_instrumentService.GetAllInstruments());
        }
    }
}