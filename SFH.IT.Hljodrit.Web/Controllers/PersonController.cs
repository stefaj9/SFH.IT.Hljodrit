using System.Web.Http;
using SFH.IT.Hljodrit.Common.Helpers;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    /// <summary>
    /// Handles all operations involving persons, which are authors and musicians
    /// </summary>
    [Authorize]
    [RoutePrefix("api")]
    public class PersonController : ApiController
    {
        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }
        /// <summary>
        /// Retrieves all performers within a certain criteria
        /// </summary>
        /// <param name="pageSize">This is a page size used within an envelope used for paging</param>
        /// <param name="pageNumber">This is a page number used within an envelope used for paging</param>
        /// <param name="searchTerm">This is a search term uesd to search within the performers name</param>
        /// <returns>A list of performers</returns>
        [HttpGet]
        [Route("performers")]
        public IHttpActionResult GetAllPerformers([FromUri] int pageSize, [FromUri] int pageNumber, string searchTerm)
        {
            return Ok(_personService.GetPerformers(pageSize, pageNumber, searchTerm ?? ""));
        }
        /// <summary>
        /// Retrieves all persons within a certain criteria
        /// </summary>
        /// <param name="pageSize">This is a page size used within an envelope used for paging</param>
        /// <param name="pageNumber">This is a page number used within an envelope used for paging</param>
        /// <param name="searchTerm">This is a search term uesd to search within the person name</param>
        /// <returns>A list of persons</returns>
        [HttpGet]
        [Route("persons")]
        public IHttpActionResult GetAllPersons([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm)
        {
            return Ok(_personService.GetPersons(pageSize, pageNumber, searchTerm ?? ""));
        }
        /// <summary>
        /// Creates a new person
        /// </summary>
        /// <param name="person">The model for the person to create</param>
        /// <returns>Ok if succeeded, otherwise Bad request</returns>
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
        /// Retrieves all roles for the user, these roles can be main composer, band member, etc.
        /// </summary>
        /// <returns>A list of available roles</returns>
        [HttpGet]
        [Route("persons/roles")]
        public IHttpActionResult GetRoles()
        {
            return Ok(_personService.GetPersonRoles());
        }
    }
}