using System.Web.Http;
using SFH.IT.Hljodrit.Common.Helpers;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    /// <summary>
    /// Handles operations regarding Main artists.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/mainartists")]
    public class MainArtistController : ApiController
    {
        private readonly IMainArtistService _mainArtistService;

        public MainArtistController(IMainArtistService mainArtistService)
        {
            _mainArtistService = mainArtistService;
        }

        /// <summary>
        /// Gets Main artists by some search criteria and returns in an envelope.
        /// </summary>
        /// <param name="pageSize">The number of results to be returned in the envelope.</param>
        /// <param name="pageNumber">The page number to be returned.</param>
        /// <param name="searchTerm">The search term to filter by.</param>
        /// <returns>An envelope containing the query results.</returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetMainArtistsByCriteria([FromUri] int pageSize, [FromUri] int pageNumber,
            [FromUri] string searchTerm)
        {
            return Ok(_mainArtistService.GetMainArtistByCriteria(pageSize, pageNumber, searchTerm ?? ""));
        }

        /// <summary>
        /// Creates a new main artist in the system.
        /// </summary>
        /// <param name="mainArtist">A model representing the person to be made a main artist.</param>
        /// <returns>The id of the newly created main artist.</returns>
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
