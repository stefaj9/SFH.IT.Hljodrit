using System.Web.Http;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;


namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [RoutePrefix("api/albums")]
    public class AlbumController : ApiController
    {
        private readonly IAlbumService _albumService;
        private readonly ISongService _songService;

        public AlbumController(IAlbumService albumService, ISongService songService)
        {
            _albumService = albumService;
            _songService = songService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAlbums([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm, [FromUri] string searchFilter)
        {
            return Ok(_albumService.GetAlbums(pageSize, pageNumber, searchTerm ?? "", searchFilter));
        }

        [HttpGet]
        [Route("{albumId:int}")]
        public IHttpActionResult GetAlbumById(int albumId)
        {
            return Ok(_albumService.GetAlbumById(albumId));
        }

        //[HttpGet]
        //[Route("{albumId:int}/musicians/{musicianId:int}")]
        //public IHttpActionResult GetMusicianOnAlbum(int albumId, int musicianId)
        //{
        //    return Ok(_albumService.GetMusicianOnAlbum(albumId, musicianId));
        //}

        [HttpGet]
        [Route("{albumId:int}/songs")]
        public IHttpActionResult GetSongsByAlbumId(int albumId)
        {
            return Ok(_albumService.GetSongsByAlbumId(albumId));
        }

        [HttpGet]
        [Route("{albumId:int}/songs/{songId:int}")]
        public IHttpActionResult GetSongOnAlbum(int albumId, int songId)
        {
            return Ok(_albumService.GetSongOnAlbum(albumId, songId));
        }

        [HttpGet]
        [Route("{albumId:int}/songs/{songId:int}/musicians")]
        public IHttpActionResult GetMusiciansOnSong(int albumId, int songId)
        {
            return Ok(_albumService.GetMusiciansOnSong(albumId, songId));
        }

        [HttpPost]
        [Route("{albumId:int}/songs/{songId:int}/musicians")]
        public IHttpActionResult AddMusicianToSong(int albumId, int songId, [FromBody] MusicianRegisterViewModel musician)
        {
            _songService.AddMusicianToSong(songId, musician);
            return Ok();
        }
    }
}