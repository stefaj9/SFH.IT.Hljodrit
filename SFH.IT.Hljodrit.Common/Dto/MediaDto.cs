using System;
using Newtonsoft.Json;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MediaDto
    {
        public MediaDto() { }
        public MediaDto(media_recording mr, int totalMusicians = 0)
        {
            this.Id = mr.id;
            this.Title = mr.recordingtitle;
            this.Duration = mr.duration;
            this.MainArtistId = mr.mainartist ?? -1;
            this.ReleaseDate = mr.recordingdate;
            this.Isrc = mr.isrc;
            this.TotalMusicians = totalMusicians;
        }

        [JsonProperty("mediaId")]
        public int Id { get; set; }
        [JsonProperty("mediaTitle")]
        public string Title { get; set; }
        [JsonProperty("duration")]
        public TimeSpan? Duration { get; set; }
        [JsonProperty(PropertyName = "mainArtistId")]
        public int MainArtistId { get; set; }
        [JsonProperty("mainArtist")]
        public string MainArtist { get; set; }
        [JsonProperty("releaseDate")]
        public DateTime? ReleaseDate { get; set; }
        [JsonProperty("isrc")]
        public string Isrc { get; set; }
        [JsonProperty("totalMusicians")]
        public int TotalMusicians { get; set; }
    }
}
