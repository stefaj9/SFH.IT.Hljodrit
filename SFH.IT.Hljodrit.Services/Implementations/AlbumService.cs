using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class AlbumService : IAlbumService
    {
        private readonly ISongRepository _songRepository;
        private readonly IAlbumRepository _albumRepository;
        private const string AlbumReleaseYearSearchFilter = "releaseYear";
        private const string AlbumMainArtistSearchFilter = "mainArtistName";

        public AlbumService(ISongRepository songRepository, IAlbumRepository albumRepository)
        {
            _songRepository = songRepository;
            _albumRepository = albumRepository;
        }

        public Envelope<AlbumDto> GetAlbums(int pageSize, int pageNumber, string searchTerm, string searchFilter)
        {
            searchTerm = string.IsNullOrEmpty(searchTerm) ? "": searchTerm.Trim();
            var mainArtistSearchName = "";

            //The default search is to search by the albums title
            Expression <Func<media_product_package, bool>> filter = album => album.albumtitle.Trim().StartsWith(searchTerm);

            switch (searchFilter)
            {
                case AlbumMainArtistSearchFilter:
                    mainArtistSearchName = searchTerm;
                    filter = album => album.albumtitle.StartsWith("");
                    break;
                case AlbumReleaseYearSearchFilter:
                    var releaseYear = Convert.ToInt32(searchTerm.Trim());
                    filter = album => album.releasedate.Year == releaseYear;
                    break;
            }

            return _albumRepository.GetAlbums(pageSize, pageNumber, searchTerm, filter, mainArtistSearchName);
        }

        public AlbumExtendedDto GetAlbumById(int albumId)
        {
            return _albumRepository.GetAlbumById(albumId);
        }

        public IEnumerable<SongDto> GetSongsByAlbumId(int albumId)
        {
            var songs = _songRepository.GetSongsByAlbumId(albumId);
            return songs;
        }

        public SongExtendedDto GetSongOnAlbum(int albumId, int songId)
        {
            var song = _songRepository.GetSongOnAlbum(albumId, songId);
            return song;
        }

        public ICollection<MusiciansOnSongDto> GetMusiciansOnSong(int albumId, int songId)
        {
            var musicians = _albumRepository.GetMusiciansOnSong(albumId, songId);
            return musicians;
        }

        //public MusicianExtendedDto GetMusicianOnAlbum(int albumId, int musicianId)
        //{
        //    return _albumRepository.GetMusicianOnAlbum(albumId, musicianId);
        //}
    }
}