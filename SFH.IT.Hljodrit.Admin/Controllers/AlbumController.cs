using System.Web.Http;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Services.Interfaces;


namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [RoutePrefix("api/albums")]
    public class AlbumController : ApiController
    {
        private readonly IAlbumService _albumService;

        public AlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
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

        [HttpPut]
        [Route("{albumId:int}")]
        public IHttpActionResult UpdateAlbumInfo(int albumId, [FromBody] AlbumExtendedDto updatedAlbum )
        {
            return Ok(_albumService.UpdateAlbumInfo(albumId, updatedAlbum));
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
    }
}