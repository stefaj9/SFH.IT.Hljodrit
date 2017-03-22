using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MainArtistDto
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("partyRealId")]
        public int? PartyRealId { get; set; }
    }
}
