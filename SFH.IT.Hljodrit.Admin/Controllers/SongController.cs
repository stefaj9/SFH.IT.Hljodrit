using System.Data.Entity.ModelConfiguration;
using System.Web.Http;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    /// <summary>
    /// Controller that handles all operations regarding to songs in the system.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/songs")]
    public class SongController : ApiController
    {

        private readonly ISongService _songService;
        public SongController(ISongService songService)
        {
            _songService = songService;
        }

        /// <summary>
        /// Gets songs filtered by a search string and search type and returns them in an envelope.
        /// </summary>
        /// <param name="pageSize">The number of results to be included in the envelope.</param>
        /// <param name="pageNumber">The page number to be returned.</param>
        /// <param name="searchTerm">The search term to search by.</param>
        /// <param name="searchType">Indicates whether the search term refers to song name, publish year etc.</param>
        /// <returns>An envelope containing the results.</returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetSongs([FromUri]int pageSize, [FromUri]int pageNumber, [FromUri] string searchTerm, [FromUri] string searchType)
        {
            return Ok(_songService.GetSongs(pageSize, pageNumber, searchTerm ?? "", searchType));
        }

        /// <summary>
        /// Gets a single song by its id.
        /// </summary>
        /// <param name="songId">The id of the song to fetch.</param>
        /// <returns>A SongDto object of the song.</returns>
        [HttpGet]
        [Route("{songId:int}")]
        public IHttpActionResult GetSongById(int songId)
        {
            return Ok(_songService.GetSongById(songId));
        }

        /// <summary>
        /// Updates a single song in the system.
        /// </summary>
        /// <param name="songId">The id of the song to update.</param>
        /// <param name="song">A SongDto model containing the updated information.</param>
        /// <returns>A SongDto containing the newly updated information.</returns>
        [HttpPut]
        [Route("{songId:int}")]
        public IHttpActionResult UpdateSongById(int songId, [FromBody] SongDto song)
        {
            if (!ModelState.IsValid)
            {
                throw new ModelValidationException("Song was not properly formatted.");
            }
            return Ok(_songService.UpdateSongById(songId, song));
        }
    }
}