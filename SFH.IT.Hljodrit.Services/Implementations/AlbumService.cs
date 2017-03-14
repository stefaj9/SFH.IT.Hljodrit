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

        public IEnumerable<SongDto> GetAllSongs()
        {
            return _songRepository.GetAll().Select(song => new SongDto
            {
                Id = song.id,
                Title = song.title
            });
        }

        public SongExtendedDto GetSongById(int id)
        {
           var song = _songRepository.GetById(id);

            return new SongExtendedDto(song);
        }

        public AlbumExtendedDto GetAlbumById(int id)
        {
            return _albumRepository.GetAlbumById(id);
        }
    }
}