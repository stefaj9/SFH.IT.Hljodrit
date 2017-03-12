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

        private readonly IAlbumRepository _albumRepository;

        public AlbumService(IAlbumRepository albumRepository)
        {
            _albumRepository = albumRepository;
        }


        public IEnumerable<SongDto> GetAllSongs()
        {
            return _albumRepository.GetAll().Select(song => new SongDto
            {
                Id = song.id,
                Title = song.title,
                RecordingId = song.recordingid,
                IsrcCode = song.isrc,
                TrackNumber = song.tracknumber
            });
        }
    }
}