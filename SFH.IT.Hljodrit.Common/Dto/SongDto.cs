using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class SongDto
    {
        public SongDto() { }
        public SongDto(media_product song)
        {
            Id = song.id;
            Title = song.title;
            AlbumId = song.packageid ?? -1;
            TrackNumber = song.tracknumber ?? -1;
            Isrc = song.isrc;
            if (song.media_recording != null)
            {
                Duration = song.media_recording.duration;
                MainArtist = song.media_recording.party_mainartist != null ? song.media_recording.party_mainartist.artistname ?? "" : "";
                MainArtistId = song.media_recording.mainartist ?? 0;
            }
            ReleaseDate = song.releasedate;
        }

        [JsonProperty(PropertyName = "songId")]
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        [JsonProperty(PropertyName = "songTitle")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "albumId")]
        public int AlbumId { get; set; }

        [JsonProperty(PropertyName = "trackNumber")]
        public int? TrackNumber { get; set; }

        [JsonProperty(PropertyName = "mainArtistId")]
        public int MainArtistId { get; set; }

        [JsonProperty(PropertyName = "mainArtist")]
        public string MainArtist { get; set; }

        [JsonProperty(PropertyName = "releaseDate")]
        public DateTime? ReleaseDate { get; set; }

        [JsonProperty(PropertyName = "recordingId")]
        public int RecordingId { get; set; }

        [JsonProperty(PropertyName = "duration")]
        public TimeSpan? Duration { get; set; }

        [JsonProperty(PropertyName = "isrc")]
        [Required(AllowEmptyStrings = false)]
        public string Isrc { get; set; }

        [JsonProperty(PropertyName = "totalMusicians")]
        public int TotalMusicians { get; set; }

        [JsonProperty(PropertyName = "registration")]
        public RegistrationDto Registration { get; set; }

        [JsonProperty(PropertyName = "sideNumber")]
        public int SideNumber { get; set; }
    }
}