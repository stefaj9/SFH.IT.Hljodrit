using System;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class TrackDto
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "projectId")]
        public int ProjectId { get; set; }
        [JsonProperty(PropertyName = "trackName")]
        public string TrackName { get; set; }
        [JsonProperty(PropertyName = "isrc")]
        public string Isrc { get; set; }
        [JsonProperty(PropertyName = "duration")]
        public TimeSpan? Duration { get; set; }
        [JsonProperty(PropertyName = "doNotPublish")]
        public bool DoNotPublish { get; set; }
        [JsonProperty(PropertyName = "trackOrder")]
        public int TrackOrder { get; set; }
    }
}