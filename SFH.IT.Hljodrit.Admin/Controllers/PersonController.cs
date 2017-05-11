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
        /// Returns all performers possibly filtered by a search term.
        /// </summary>
        /// <param name="pageSize">The amount of results per page returned.</param>
        /// <param name="pageNumber">The number of the page to be returned.</param>
        /// <param name="searchTerm">The optional search term to filter by.</param>
        /// <returns>An envelope containing the results of the query.</returns>
        [HttpGet]
        [Route("performers")]
        public IHttpActionResult GetAllPerformers([FromUri] int pageSize, [FromUri] int pageNumber, string searchTerm)
        {
            return Ok(_personService.GetPerformers(pageSize, pageNumber, searchTerm ?? ""));
        }

        /// <summary>
        /// Returns all persons optionally filtered by a search term.
        /// </summary>
        /// <param name="pageSize">The amount of results per page returned.</param>
        /// <param name="pageNumber">The number of the page to be returned.</param>
        /// <param name="searchTerm">The optional search term to filter by.</param>
        /// <returns>An envelope containing the results of the query.</returns>
        [HttpGet]
        [Route("persons")]
        public IHttpActionResult GetAllPersons([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm)
        {
            return Ok(_personService.GetPersons(pageSize, pageNumber, searchTerm ?? ""));
        }

        /// <summary>
        /// Adds a person to the system.
        /// </summary>
        /// <param name="person">A view model containing the necessary information to add a new person.</param>
        /// <returns>The id of the newly created person.</returns>
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

        /// <summary>
        /// Gets a person by its id.
        /// </summary>
        /// <param name="personId">The id of the person to fetch.</param>
        /// <returns>A PersonExtendedDto of the person to be returned.</returns>
        [HttpGet]
        [Route("persons/{personId:int}")]
        public IHttpActionResult GetPersonById(int personId)
        {
            return Ok(_personService.GetPersonById(personId));
        }

        /// <summary>
        /// Updates a persons information in the system.
        /// </summary>
        /// <param name="personId">The id of the person to update.</param>
        /// <param name="person">A PersonExtendedDto object containing the updated information.</param>
        /// <returns>A PersonExtendedDto of the updated person.</returns>
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

        /// <summary>
        /// Deletes a person from the system by marking it as deleted.
        /// </summary>
        /// <param name="personId">The id of the person to delete.</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("persons/{personId:int}")]
        public IHttpActionResult DeletePersonById(int personId)
        {
            _personService.DeletePersonById(personId);
            return Ok();
        }

        /// <summary>
        /// Gets all media associated to a certain person.
        /// </summary>
        /// <param name="personId">The id of the person to retrieve media for.</param>
        /// <returns>An IEnumerable of MediaWithRoleDto objects of all media belonging to the person.</returns>
        [HttpGet]
        [Route("persons/{personId:int}/medias")]
        public IHttpActionResult GetAllMediaForPerson(int personId)
        {
            return Ok(_personService.GetAllMediaAssociatedWithMusician(personId));
        }

        /// <summary>
        /// Returns all albums on which a person appears.
        /// </summary>
        /// <param name="personId">The id of the person to fetch albums for.</param>
        /// <returns>An IEnumerable of AlbumDto representing all albums that the person appears on.</returns>
        [HttpGet]
        [Route("persons/{personId:int}/albums")]
        public IHttpActionResult GetAllAlbumsForPerson(int personId)
        {
            return Ok(_personService.GetAllAlbumsAssociatedWithMusician(personId));
        }

        /// <summary>
        /// Gets all role types that are marked as active in the system.
        /// </summary>
        /// <returns>An IEnumerable of RoleDto representing all roles in the system.</returns>
        [HttpGet]
        [Route("persons/roles")]
        public IHttpActionResult GetRoles()
        {
            return Ok(_personService.GetPersonRoles());
        }

        /// <summary>
        /// Gets a persons email from his username.
        /// </summary>
        /// <param name="username">The username of the person.</param>
        /// <returns>The email of the person with the username.</returns>
        [HttpGet]
        [Route("users/{username}")]
        public IHttpActionResult GetEmailFromUsername(string username)
        {
            return Ok(_userService.GetEmailFromUsername(username));
        }
    }
}