using System.Web.Http;
using SFH.IT.Hljodrit.Common.Helpers;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    /// <summary>
    /// Used for methods for dealing with main artists.
    /// </summary>
    [Authorize]
    [RoutePrefix("api/mainartists")]
    public class MainArtistController : ApiController
    {
        private readonly IMainArtistService _mainArtistService;

        public MainArtistController(IMainArtistService mainArtistService)
        {
            _mainArtistService = mainArtistService;
        }
        /// <summary>
        /// Retrieves all main artists based on a search criteria
        /// </summary>
        /// <param name="pageSize">This is a page size used within an envelope for paging</param>
        /// <param name="pageNumber">This is a page number used within an envelope for paging</param>
        /// <param name="searchTerm">This is the search term for searching within a string for main artist</param>
        /// <returns>An IEnumerable of main artist wrapped in MainArtistDto (Envelope)</returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetMainArtistsByCriteria([FromUri] int pageSize, [FromUri] int pageNumber,
            [FromUri] string searchTerm)
        {
            return Ok(_mainArtistService.GetMainArtistByCriteria(pageSize, pageNumber, searchTerm ?? ""));
        }

        /// <summary>
        /// Creates a new main artist
        /// </summary>
        /// <param name="mainArtist">The post data for creating the main artist</param>
        /// <returns>OK if it was created successfully or Bad Request if it failed.</returns>
        [HttpPost]
        [Route("")]
        public IHttpActionResult CreateMainArtist(PersonRegisterViewModel mainArtist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ValidationHelper.GenerateErrorMessage(ModelState.Values));
            }

            return Ok(_mainArtistService.AddMainArtist(mainArtist, User.Identity.Name));
        }
    }
}
