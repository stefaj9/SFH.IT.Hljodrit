using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
	[System.Web.Mvc.RoutePrefix("api")]
	public class SettingsController : ApiController
	{
		private readonly ISettingsService _settingsService;

		public SettingsController(ISettingsService settingsService)
		{
			_settingsService = settingsService;
		}

		[System.Web.Mvc.HttpGet]
		[System.Web.Mvc.Route("exceptions")]
		public IHttpActionResult GetAllExceptions([FromUri] int pageSize, [FromUri] int pageNumber)
		{
			return Ok(_settingsService.GetAllExceptions(pageSize, pageNumber));
		}
    }
}