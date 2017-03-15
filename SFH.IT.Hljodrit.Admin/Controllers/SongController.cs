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
        public IHttpActionResult GetSongs()
        {
            return Ok(_songService.GetSongs());
        }

        [HttpGet]
        [Route("{songId:int}")]
        public IHttpActionResult GetSongById(int songId)
        {
            return Ok(_songService.GetSongById(songId));
        }
    }
}