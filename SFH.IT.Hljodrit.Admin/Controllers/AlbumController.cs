using System.Collections.Generic;
using System.Web.Http;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [RoutePrefix("api/albums")]
    public class AlbumController : ApiController
    {
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllAlbums()
        {
            // TODO: Create mock data
            // TODO: Use paging to get the data
            // TODO: Introduce a filter for the data as well as a search input
            return Ok();
        }
    }
}
