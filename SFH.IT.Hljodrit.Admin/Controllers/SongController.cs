﻿using System.Data.Entity.ModelConfiguration;
using System.Web.Http;
using SFH.IT.Hljodrit.Common.Dto;
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
        public IHttpActionResult GetSongs([FromUri]int pageSize, [FromUri]int pageNumber, [FromUri] string searchTerm, [FromUri] string searchType)
        {
            return Ok(_songService.GetSongs(pageSize, pageNumber, searchTerm ?? "", searchType));
        }

        [HttpGet]
        [Route("{songId:int}")]
        public IHttpActionResult GetSongById(int songId)
        {
            return Ok(_songService.GetSongById(songId));
        }

        [HttpPut]
        [Route("{songId:int}")]
        public IHttpActionResult UpdateSongById(int songId, [FromBody] SongDto song)
        {
            if (!ModelState.IsValid)
            {
                throw new ModelValidationException("Song was not properly formatted.");
            }
            return Ok(_songService.UpdateSongById(songId, song));
        }
    }
}