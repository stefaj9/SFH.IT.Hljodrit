using System.Linq;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.Ajax.Utilities;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.Helpers;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    /// <summary>
    /// Handles all operations involving persons meaning f.e. musicians etc.
    /// </summary>
    [RoutePrefix("api")]
    public class PersonController : ApiController
    {
        private readonly IPersonService _personService;
        private readonly IUserService _userService;

        public PersonController(IPersonService personService, IUserService userService)
        {
            _personService = personService;
            _userService = userService;
        }

        /// <summary>
        /// j
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <param name="searchTerm"></param>
        /// <returns></returns>
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
            if (!ModelState.IsValid && !person.Email.IsNullOrWhiteSpace())
            {
                return BadRequest(ValidationHelper.GenerateErrorMessage(ModelState.Values));
            }
            return Ok(_personService.UpdatePersonInfo(personId, person));
        }

        [HttpDelete]
        [Route("persons/{personId:int}")]
        public IHttpActionResult DeletePersonById(int personId)
        {
            _personService.DeletePersonById(personId);
            return Ok();
        }

        [HttpGet]
        [Route("persons/{personId:int}/medias")]
        public IHttpActionResult GetAllMediaForPerson(int personId)
        {
            return Ok(_personService.GetAllMediaAssociatedWithMusician(personId));
        }

        [HttpGet]
        [Route("persons/{personId:int}/albums")]
        public IHttpActionResult GetAllAlbumsForPerson(int personId)
        {
            return Ok(_personService.GetAllAlbumsAssociatedWithMusician(personId));
        }

        [HttpGet]
        [Route("persons/roles")]
        public IHttpActionResult GetRoles()
        {
            return Ok(_personService.GetPersonRoles());
        }

        [HttpGet]
        [Route("users/{username}")]
        public IHttpActionResult GetEmailFromUsername(string username)
        {
            return Ok(_userService.GetEmailFromUsername(username));
        }
    }
}