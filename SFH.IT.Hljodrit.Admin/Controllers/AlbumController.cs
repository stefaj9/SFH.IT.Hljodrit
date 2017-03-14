using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;


namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [RoutePrefix("api")]
    public class AlbumController : ApiController
    {
        private readonly IAlbumService _albumService;

        public AlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        [HttpGet]
        [Route("songs")]
        public IHttpActionResult GetAllSongs()
        {
            return Ok(_albumService.GetAllSongs());
        }

        [HttpGet]
        [Route("songs/{id:int}")]
        public IHttpActionResult GetSongById(int id)
        {
            return Ok(_albumService.GetSongById(id));
        }

        [HttpGet]
        [Route("albums")]
        public IHttpActionResult GetAlbums()
        {
            return Ok(_albumService.GetAlbums());
        }

        [HttpGet]
        [Route("albums/{id:int}")]
        public IHttpActionResult GetAlbumById(int id)
        {
            return Ok(_albumService.GetAlbumById(id));
        }
    }
}