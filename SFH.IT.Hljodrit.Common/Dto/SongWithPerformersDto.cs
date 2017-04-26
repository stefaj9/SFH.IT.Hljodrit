using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class SongWithPerformersDto
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "isrc")]
        public string Isrc { get; set; }
        [JsonProperty(PropertyName = "length")]
        public TimeSpan? Length { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "number")]
        public int Number { get; set; }
        [JsonProperty(PropertyName = "recordingDate")]
        public DateTime RecordingDate { get; set; }
        [JsonProperty(PropertyName = "performers")]
        public List<MusicianLiteDto> Performers { get; set; }
    }
}
