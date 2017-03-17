using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
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
        public IHttpActionResult GetAlbums()
        {
            return Ok(_albumService.GetAlbums());
        }

        [HttpGet]
        [Route("{albumId:int}")]
        public IHttpActionResult GetAlbumById(int albumId)
        {
            return Ok(_albumService.GetAlbumById(albumId));
        }

        [HttpGet]
        [Route("{albumId:int}/musicians")]
        public IHttpActionResult GetMusiciansByAlbumId(int albumId)
        {
            return Ok(_albumService.GetMusiciansByAlbumId(albumId));
        }

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
    }
}