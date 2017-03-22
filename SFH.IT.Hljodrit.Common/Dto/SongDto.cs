using System;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class SongDto
    {
        [JsonProperty(PropertyName = "songId")]
        public int Id { get; set; }

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
        public TimeSpan Duration { get; set; }

        [JsonProperty(PropertyName = "isrc")]
        public string Isrc { get; set; }

        [JsonProperty(PropertyName = "totalMusicians")]
        public int TotalMusicians { get; set; }

        [JsonProperty(PropertyName = "registration")]
        public RegistrationDto Registration { get; set; }
    }
}