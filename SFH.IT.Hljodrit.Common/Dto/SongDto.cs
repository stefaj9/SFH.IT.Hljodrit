using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class SongDto
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "trackNumber")]
        public int? TrackNumber { get; set; }
    }
}