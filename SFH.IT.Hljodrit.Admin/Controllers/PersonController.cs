﻿using System.Web.Http;
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
        public IHttpActionResult GetAllPerformers([FromUri] int pageSize, [FromUri] int pageNumber, string searchTerm)
        {
            return Ok(_personService.GetPerformers(pageSize, pageNumber, searchTerm ?? ""));
        }

        [HttpGet]
        [Route("producers")]
        public IHttpActionResult GetAllProducers([FromUri] int pageSize, [FromUri] int pageNumber, string searchTerm)
        {
            return Ok(_personService.GetProducers(pageSize, pageNumber, searchTerm ?? ""));
        }

        [HttpGet]
        [Route("vipusers")]
        public IHttpActionResult GetVipUsers([FromUri] int pageSize, [FromUri] int pageNumber)
        {
            return Ok(_personService.GetVipUsers(pageSize, pageNumber));
        }

        [HttpGet]
        [Route("persons")]
        public IHttpActionResult GetAllPersons([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm, [FromUri] bool performers, [FromUri] bool producers, [FromUri] bool vip)
        {
            if (performers || producers || vip)
            {
                return Ok(_personService.GetFilteredPersons(pageSize, pageNumber, performers, producers, vip));
            }
            return Ok(_personService.GetPersons(pageSize, pageNumber, searchTerm ?? ""));
        }

        [HttpGet]
        [Route("persons/{personId:int}")]
        public IHttpActionResult GetPersonById(int personId)
        {
            return Ok(_personService.GetPersonById(personId));
        }

        [HttpGet]
        [Route("persons/roles")]
        public IHttpActionResult GetRoles()
        {
            return Ok(_personService.GetPersonRoles());
        }
    }
}