using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    /// <summary>
    /// Handles all media operations in the system. A media is any recording whether it has 
    /// been published on an album or not.
    /// </summary>
    //[Authorize(Roles = "Admin")]
    [RoutePrefix("api/media")]
    public class MediaController : ApiController
    {
        private readonly IMediaService _mediaService;

        public MediaController(IMediaService mediaService)
        {
            _mediaService = mediaService;
        }

        /// <summary>
        /// Gets all media and can be filtered by a search query.
        /// </summary>
        /// <param name="pageSize">The number of results to be returned per envelope.</param>
        /// <param name="pageNumber">The page number to be returned.</param>
        /// <param name="searchTerm">A searchstring to filter by.</param>
        /// <param name="searchType">A filter to search by f.e. Main artist or publish year.</param>
        /// <returns>An envelope containing the results.</returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllMedia([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm, [FromUri] string searchType)
        {
            return Ok(_mediaService.GetAllMedia(pageNumber, pageSize, searchTerm ?? "", searchType));
        }

        /// <summary>
        /// Gets a single media object by its id.
        /// </summary>
        /// <param name="mediaId">The id of the media to be returned.</param>
        /// <returns>A MediaExtendedDto of the media.</returns>
        [HttpGet]
        [Route("{mediaId:int}")]
        public IHttpActionResult GetMediaById(int mediaId)
        {
            return Ok(_mediaService.GetMediaById(mediaId));
        }
    }
}
