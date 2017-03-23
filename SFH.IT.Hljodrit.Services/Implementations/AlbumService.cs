using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class AlbumService : IAlbumService
    {
        private readonly ISongRepository _songRepository;
        private readonly IAlbumRepository _albumRepository;

        public AlbumService(ISongRepository songRepository, IAlbumRepository albumRepository)
        {
            _songRepository = songRepository;
            _albumRepository = albumRepository;
        }

        public IEnumerable<AlbumDto> GetAlbums()
        {
            return _albumRepository.GetAlbums();
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