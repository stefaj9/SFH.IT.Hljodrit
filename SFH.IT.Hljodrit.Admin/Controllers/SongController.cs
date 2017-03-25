using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [RoutePrefix("api/songs")]
    public class SongController : ApiController
    {

        private readonly ISongService _songService;
        public SongController(ISongService songService)
        {
            _songService = songService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetSongs([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm)
        {
            return Ok(_songService.GetSongs(pageSize, pageNumber, searchTerm ?? ""));
        }

        [HttpGet]
        [Route("{songId:int}")]
        public IHttpActionResult GetSongById(int songId)
        {
            return Ok(_songService.GetSongById(songId));
        }
    }
}