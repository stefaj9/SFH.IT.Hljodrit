using System;
using System.Web.Http;
using SFH.IT.Hljodrit.Services.Implementations;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [RoutePrefix("api/performers")]
    public class PerformersController : ApiController
    {
        private readonly IPerformersService _performersService;


        public PerformersController(IPerformersService performersService)
        {
            _performersService = performersService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllPerformers()
        {
            return Ok(_performersService.GetAllPerformers());
        }

    }
}