using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    /// <summary>
    /// Handles all operations regarding the settings menu of the system.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api")]
	public class SettingsController : ApiController
	{
		private readonly ISettingsService _settingsService;

		public SettingsController(ISettingsService settingsService)
		{
			_settingsService = settingsService;
		}

        /// <summary>
        /// Returns all exceptions that have been logged by the system.
        /// </summary>
        /// <param name="pageSize">The number of results to be included in the envelope.</param>
        /// <param name="pageNumber">The page number to be returned.</param>
        /// <returns>An IEnumerable of ExceptionDto containing the logged exceptions that have occurred.</returns>
		[HttpGet]
		[Route("exceptions")]
		public IHttpActionResult GetAllExceptions([FromUri] int pageSize, [FromUri] int pageNumber)
		{
			return Ok(_settingsService.GetAllExceptions(pageSize, pageNumber));
		}
    }
}