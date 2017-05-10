using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/media")]
    public class MediaController : ApiController
    {
        private readonly IMediaService _mediaService;

        public MediaController(IMediaService mediaService)
        {
            _mediaService = mediaService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllMedia([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm, [FromUri] string searchType)
        {
            return Ok(_mediaService.GetAllMedia(pageNumber, pageSize, searchTerm ?? "", searchType));
        }

        [HttpGet]
        [Route("{mediaId:int}")]
        public IHttpActionResult GetMediaById(int mediaId)
        {
            return Ok(_mediaService.GetMediaById(mediaId));
        }
    }
}
