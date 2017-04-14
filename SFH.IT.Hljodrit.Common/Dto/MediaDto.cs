using System;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MediaDto
    {
        [JsonProperty("mediaId")]
        public int Id { get; set; }
        [JsonProperty("mediaTitle")]
        public string Title { get; set; }
        [JsonProperty("duration")]
        public TimeSpan? Duration { get; set; }
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
