using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Repositories.Interfaces.Media;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class MediaService : IMediaService
    {
        private readonly IMediaRecordingRepository _mediaRecordingRepository;

        public MediaService(IMediaRecordingRepository mediaRecordingRepository)
        {
            _mediaRecordingRepository = mediaRecordingRepository;
        }

        public Envelope<MediaDto> GetAllMedia(int pageNumber, int pageSize, string searchTerm, string searchType)
        {
            return _mediaRecordingRepository.GetAllMedia(pageNumber, pageSize, searchTerm, GetSearchExpression(searchTerm, searchType));
        }

        private Expression<Func<media_recording, bool>> GetSearchExpression(string searchTerm, string searchType)
        {
            switch (searchType)
            {
                case "name":
                    return dto => dto.recordingtitle.StartsWith(searchTerm);
                case "mainArtist":
                    return dto => dto.party_mainartist == null || dto.party_mainartist.artistname.Contains(searchTerm);
                case "publishYear":
                    return dto => !dto.recordingdate.HasValue || dto.recordingdate.Value.Year.ToString().Contains(searchTerm);
            }

            return dto => dto.recordingtitle.Contains(searchTerm);
        }

        public MediaExtendedDto GetMediaById(int mediaId)
        {
            return _mediaRecordingRepository.GetMediaById(mediaId);
        }
    }
}
