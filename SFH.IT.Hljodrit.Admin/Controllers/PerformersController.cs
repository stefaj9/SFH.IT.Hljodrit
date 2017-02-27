using System;
using System.Web.Http;
using SFH.IT.Hljodrit.Services.Implementations;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [RoutePrefix("api")]
    public class PersonController : ApiController
    {
        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        [Route("performers")]
        public IHttpActionResult GetAllPerformers()
        {
            return Ok(_personService.GetAllPerformers());
        }

        [HttpGet]
        [Route("producers")]
        public IHttpActionResult GetAllProducers()
        {
            return Ok(_personService.GetAllProducers());
        }

    }
}