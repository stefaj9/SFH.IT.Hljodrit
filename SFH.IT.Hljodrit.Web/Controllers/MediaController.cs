using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    /// <summary>
    /// Routes to manipulate and extract data for media within the system.
    /// </summary>
    [Authorize]
    [RoutePrefix("api/media")]
    public class MediaController : ApiController
    {
        private readonly IMediaService _mediaService;

        public MediaController(IMediaService mediaService)
        {
            _mediaService = mediaService;
        }
        /// <summary>
        /// Gets all media based on a search filter
        /// </summary>
        /// <param name="pageSize">This is a page size used within an envelope used for paging</param>
        /// <param name="pageNumber">This is a page number used within an envelope used for paging</param>
        /// <param name="searchTerm">This is a search term uesd to search within the media</param>
        /// <param name="searchType">Search type used to distinguish what to search for</param>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllMedia([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm, [FromUri] string searchType)
        {
            return Ok(_mediaService.GetAllMedia(pageNumber, pageSize, searchTerm ?? "", searchType));
        }
    }
}
