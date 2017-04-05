using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class SongService : ISongService
    {
        private readonly ISongRepository _songRepository;

        public SongService(ISongRepository songRepository)
        {
            _songRepository = songRepository;
        }

        public Envelope<SongDto> GetSongs(int pageSize, int pageNumber, string searchTerm, string searchType)
        {
            var songs = _songRepository.GetSongs(pageSize, pageNumber, searchTerm, GetSearchType(searchType, searchTerm));
            return songs;
        }

        public SongExtendedDto GetSongById(int id)
        {
            var song = _songRepository.GetById(id);
            return new SongExtendedDto(song);
        }

        private Expression<Func<SongDto, bool>> GetSearchType(string searchType, string searchTerm)
        {
            switch (searchType)
            {
                case "name":
                    return dto => dto.Title.Contains(searchTerm);
                case "mainArtist":
                    return dto => dto.MainArtist.Contains(searchTerm);
                case "publishYear":
                    return dto => !dto.ReleaseDate.HasValue || dto.ReleaseDate.Value.Year.ToString().Contains(searchTerm);
            }
            return dto => dto.Title.Contains(searchTerm);
        }
    }
}