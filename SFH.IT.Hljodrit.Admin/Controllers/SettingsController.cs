using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
	[RoutePrefix("api")]
	public class SettingsController : ApiController
    {
		private readonly ISettingsService _settingsService;

		public SettingsController(ISettingsService settingsService)
		{
			_settingsService = settingsService;
		}

		[HttpGet]
		[Route("exceptions")]
		public IHttpActionResult GetAllExceptions([FromUri] int pageSize, [FromUri] int pageNumber)
		{
			return Ok(_settingsService.GetAllExceptions(pageSize, pageNumber));
		}
	}
}
