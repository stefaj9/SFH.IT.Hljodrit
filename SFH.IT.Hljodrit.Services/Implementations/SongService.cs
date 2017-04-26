using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;
using SFH.IT.Hljodrit.Repositories.Interfaces.Instruments;
using SFH.IT.Hljodrit.Repositories.Interfaces.Media;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class SongService : ISongService
    {
        private readonly ISongRepository _songRepository;
        private readonly IMediaRecordingRepository _mediaRecordingRepository;
        private readonly IRecordingPartyRepository _recordingPartyRepository;
        private readonly IInstrumentRepository _instrumentRepository;
        private readonly IUnitOfWork<HljodritEntities> _unitOfWork;

        public SongService(ISongRepository songRepository, IRecordingPartyRepository recordingPartyRepository, IUnitOfWork<HljodritEntities> unitOfWork, IInstrumentRepository instrumentRepository, IMediaRecordingRepository mediaRecordingRepository)
        {
            _songRepository = songRepository;
            _recordingPartyRepository = recordingPartyRepository;
            _unitOfWork = unitOfWork;
            _instrumentRepository = instrumentRepository;
            _mediaRecordingRepository = mediaRecordingRepository;
        }

        public Envelope<SongDto> GetSongs(int pageSize, int pageNumber, string searchTerm, string searchType)
        {
            var songs = _songRepository.GetSongs(pageSize, pageNumber, searchTerm, GetSearchType(searchType, searchTerm));
            return songs;
        }

        public SongDto GetSongById(int id)
        {
            var song = _songRepository.GetById(id);
            return new SongDto(song);
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

        public void AddMusicianToSong(int songId, MusicianRegisterViewModel musician)
        {
            var recordingId = _songRepository.Get(s => s.id == songId).recordingid;

            _recordingPartyRepository.Add(new recording_party
            {
                recordingid = recordingId,
                partyrealid = musician.PartyRealId,
                rolecode = musician.Role.RoleCode,
                instrumentcode = musician.Instrument.IdCode,
                updatedby = "User", // Replace with user
                updatedon = DateTime.Now,
                createdby = "User",
                createdon = DateTime.Now,
                status = 2
            });

            _unitOfWork.Commit();
        }

        public SongDto UpdateSongById(int songId, SongDto song)
        {
            var songEntity = _songRepository.GetById(songId);
            var mediaRecording = _mediaRecordingRepository.GetById(songEntity.recordingid);

            if (songEntity == null || mediaRecording == null) return song;
            songEntity.title = song.Title;
            mediaRecording.recordingtitle = song.Title;
            mediaRecording.duration = song.Duration;
            songEntity.isrc = song.Isrc;
            mediaRecording.isrc = song.Isrc;
            songEntity.releasedate = song.ReleaseDate;

            _mediaRecordingRepository.Update(mediaRecording);
            _songRepository.Update(songEntity);

            _unitOfWork.Commit();

            return song;
        }

        public void RemoveMusiciansFromSong(int songId, IEnumerable<int> musicianIds)
        {
            var mediaRecordingId = _songRepository.GetById(songId).media_recording.id;
            musicianIds.ToList().ForEach(musicianId => _recordingPartyRepository.Delete(r => r.id == musicianId && r.media_recording.id == mediaRecordingId));
            _unitOfWork.Commit();
        }


        public void RemoveSongsFromAlbum(IEnumerable<int> songIds)
        {
            var enumerable = songIds as IList<int> ?? songIds.ToList();
            foreach (var songId in enumerable.ToList())
            {
                var songEntity = _songRepository.GetById(songId);
                songEntity.is_deleted = true;
            }
            _unitOfWork.Commit();
        }

        public void UpdateMusicianInfoOnSong(int songId, int musicianId, MusicianInfoModifyModel model)
        {
            var musicianToUpdate = _recordingPartyRepository.GetById(musicianId);

            musicianToUpdate.instrumentcode = model.Instruments == "" ? null : model.Instruments;
            musicianToUpdate.rolecode = model.Role;

            _recordingPartyRepository.Update(musicianToUpdate);
            _unitOfWork.Commit();
        }
    }
}