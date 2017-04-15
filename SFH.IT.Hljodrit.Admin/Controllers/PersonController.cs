using System.Linq;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.Helpers;
using SFH.IT.Hljodrit.Common.ViewModels;
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
        [Route("persons")]
        public IHttpActionResult GetAllPersons([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm)
        {
            return Ok(_personService.GetPersons(pageSize, pageNumber, searchTerm ?? ""));
        }

        [HttpPost]
        [Route("persons")]
        public IHttpActionResult AddPerson([FromBody] PersonRegisterViewModel person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ValidationHelper.GenerateErrorMessage(ModelState.Values));
            }

            return Ok(_personService.AddPerson(person));
        }

        [HttpGet]
        [Route("persons/{personId:int}")]
        public IHttpActionResult GetPersonById(int personId)
        {
            return Ok(_personService.GetPersonById(personId));
        }

        [HttpPut]
        [Route("persons/{personId:int}")]
        public IHttpActionResult UpdatePersonInfo(int personId, [FromBody] PersonExtendedDto person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ValidationHelper.GenerateErrorMessage(ModelState.Values));
            }
            return Ok(_personService.UpdatePersonInfo(personId, person));
        }

        [HttpGet]
        [Route("persons/{personId:int}/medias")]
        public IHttpActionResult GetAllMediaForPerson(int personId, [FromUri] int pageNumber, [FromUri] int pageSize, [FromUri] string searchTerm)
        {
            return Ok(_personService.GetAllMediaAssociatedWithMusician(personId, pageNumber, pageSize, searchTerm ?? ""));
        }

        [HttpGet]
        [Route("persons/roles")]
        public IHttpActionResult GetRoles()
        {
            return Ok(_personService.GetPersonRoles());
        }
    }
}