using System.Collections.Generic;
using System.Web.Http;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;


namespace SFH.IT.Hljodrit.Admin.Controllers
{
    /// <summary>
    /// Albums controller takes care of all things regarding albums in the system. Supports various 
    /// actions regarding them.
    /// </summary>
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

        /// <summary>
        /// GetAlbums returns an envelope containing results from a requested search. 
        /// </summary>
        /// <param name="pageSize">The number of albums to be returned in an envelope object.</param>
        /// <param name="pageNumber">The number of the page to be returned.</param>
        /// <param name="searchTerm">Searchstring to narrow results down.</param>
        /// <param name="searchFilter">Searchfilter decides if the search is for Main artist name or publish year.</param>
        /// <returns>An envelope containing the results as well as the current page number</returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAlbums([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm, [FromUri] string searchFilter)
        {
            return Ok(_albumService.GetAlbums(pageSize, pageNumber, searchTerm ?? "", searchFilter));
        }

        /// <summary>
        /// Creates an album in the system.
        /// </summary>
        /// <param name="album">A view model object of a new album to be created.</param>
        /// <returns>The id of the newly created album.</returns>
        [HttpPost]
        [Route("")]
        public IHttpActionResult CreateAlbum([FromBody] AlbumCreationViewModel album)
        {
            return Ok(_albumService.CreateAlbum(album));
        }

        /// <summary>
        /// Gets a single album by it's id.
        /// </summary>
        /// <param name="albumId">The id of the album to retrieve.</param>
        /// <returns>An AlbumExtendedDto object of the album if it was found.</returns>
        [HttpGet]
        [Route("{albumId:int}")]
        public IHttpActionResult GetAlbumById(int albumId)
        {
            return Ok(_albumService.GetAlbumById(albumId));
        }

        /// <summary>
        /// Updates the information on an album by its id.
        /// </summary>
        /// <param name="albumId">The id of the album to update.</param>
        /// <param name="updatedAlbum">An album view model that contains the updated information.</param>
        /// <returns>An AlbumExtendedDto of the updated album.</returns>
        [HttpPut]
        [Route("{albumId:int}")]
        public IHttpActionResult UpdateAlbumInfo(int albumId, [FromBody] AlbumViewModel updatedAlbum )
        {
            return Ok(_albumService.UpdateAlbumInfo(albumId, updatedAlbum));
        }

        //[HttpGet]
        //[Route("{albumId:int}/musicians/{musicianId:int}")]
        //public IHttpActionResult GetMusicianOnAlbum(int albumId, int musicianId)
        //{
        //    return Ok(_albumService.GetMusicianOnAlbum(albumId, musicianId));
        //}

        /// <summary>
        /// Returns the songs belonging to an album.
        /// </summary>
        /// <param name="albumId">The id of the album to fetch the songs from.</param>
        /// <returns>An IENumerable of all the songs belonging to the album.</returns>
        [HttpGet]
        [Route("{albumId:int}/songs")]
        public IHttpActionResult GetSongsByAlbumId(int albumId)
        {
            return Ok(_albumService.GetSongsByAlbumId(albumId));
        }

        /// <summary>
        /// Removes a number of songs from an album.
        /// </summary>
        /// <param name="albumId">The id of the album to remove songs from.</param>
        /// <param name="songIds">An IENumerable of the id's of songs to remove from the album.</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{albumId:int}/songs")]
        public IHttpActionResult RemoveSongsFromAlbum( int albumId, [FromBody] IEnumerable<int> songIds)
        {
            _songService.RemoveSongsFromAlbum(songIds);
            return Ok();
        }

        /// <summary>
        /// Gets a particular song from an album.
        /// </summary>
        /// <param name="albumId">The id of the album to fetch a song from.</param>
        /// <param name="songId">The id of the song to fetch from the album.</param>
        /// <returns>A SongDto object.</returns>
        [HttpGet]
        [Route("{albumId:int}/songs/{songId:int}")]
        public IHttpActionResult GetSongOnAlbum(int albumId, int songId)
        {
            return Ok(_albumService.GetSongOnAlbum(albumId, songId));
        }

        /// <summary>
        /// Gets the musicians that appear on a song.
        /// </summary>
        /// <param name="albumId">The id of the album.</param>
        /// <param name="songId">The id of the song to fetch musicians from.</param>
        /// <returns>An ICollection of MusiciansOnSongDto of all musicians appearing on the song.</returns>
        [HttpGet]
        [Route("{albumId:int}/songs/{songId:int}/musicians")]
        public IHttpActionResult GetMusiciansOnSong(int albumId, int songId)
        {
            return Ok(_albumService.GetMusiciansOnSong(albumId, songId));
        }

        /// <summary>
        /// Adds a musician to a particular song.
        /// </summary>
        /// <param name="albumId">The id of the album containing the song.</param>
        /// <param name="songId">The id of the song to add a musician to.</param>
        /// <param name="musician">A MusicianRegisterViewModel of the musician to be added to the song.</param>
        /// <returns></returns>
        [HttpPost]
        [Route("{albumId:int}/songs/{songId:int}/musicians")]
        public IHttpActionResult AddMusicianToSong(int albumId, int songId, [FromBody] MusicianRegisterViewModel musician)
        {
            _songService.AddMusicianToSong(songId, musician);
            return Ok();
        }

        /// <summary>
        /// Updates information on a musician on a certain song.
        /// </summary>
        /// <param name="albumId">The id of the album containing the song.</param>
        /// <param name="songId">The id of the song.</param>
        /// <param name="musicianId">The id of the musician to be updated.</param>
        /// <param name="model">A MusicianInfoModifyViewModel containing the update information for the musician.</param>
        /// <returns></returns>
        [HttpPut]
        [Route("{albumId:int}/songs/{songId:int}/musicians/{musicianId:int}")]
        public IHttpActionResult UpdateMusicianInfoOnSong(int albumId, int songId, int musicianId,
            [FromBody] MusicianInfoModifyModel model)
        {
            _songService.UpdateMusicianInfoOnSong(songId, musicianId, model);
            return Ok();
        }

        /// <summary>
        /// Removes a number of musicians from a certain song.
        /// </summary>
        /// <param name="albumId">The id of the album containing the song.</param>
        /// <param name="songId">The id of the song to remove musicians from.</param>
        /// <param name="musicianIds">An IENumerable containing the id's of the musicians to remove.</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{albumId:int}/songs/{songId:int}/musicians")]
        public IHttpActionResult RemoveMusiciansFromSong(int albumId, int songId, [FromBody] IEnumerable<int> musicianIds)
        {
            _songService.RemoveMusiciansFromSong(songId, musicianIds);
            return Ok();
        }

    }
}