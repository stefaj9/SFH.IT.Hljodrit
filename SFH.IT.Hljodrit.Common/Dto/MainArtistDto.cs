using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// A DTO object representing a main artist. A main artist appears on an album.
    /// </summary>
    public class MainArtistDto
    {
        /// <summary>
        /// The id of the main artist. 
        /// </summary>
        [JsonProperty("id")]
        public int Id { get; set; }

        /// <summary>
        /// The full name of the main artist.
        /// </summary>
        [JsonProperty("fullName")]
        public string Name { get; set; }

        /// <summary>
        /// The id of the main artist in the 'party_real' table which contains all persons in the system. 
        /// </summary>
        [JsonProperty("partyRealId")]
        public int? PartyRealId { get; set; }
    }
}
