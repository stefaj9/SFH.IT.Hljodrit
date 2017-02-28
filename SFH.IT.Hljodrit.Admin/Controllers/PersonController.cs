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
        public IHttpActionResult GetAllPerformers([FromUri] int pageSize, [FromUri] int pageNumber)
        {
            return Ok(_personService.GetAllPerformers(pageSize, pageNumber));
        }

        [HttpGet]
        [Route("producers")]
        public IHttpActionResult GetAllProducers([FromUri] int pageSize, [FromUri] int pageNumber)
        {
            return Ok(_personService.GetAllProducers(pageSize, pageNumber));
        }

    }
}