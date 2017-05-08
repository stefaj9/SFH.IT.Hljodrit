using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// A DTO object representing a musician performing on a song.
    /// </summary>
    public class MusicianCreditsDto
    {
        public MusicianCreditsDto()
        {
            Registration = new RegistrationDto();
        }

        [JsonProperty(PropertyName = "creditId")]
        public int CreditId { get; set; }

        [JsonProperty(PropertyName = "albumId")]
        public int AlbumId { get; set; }

        [JsonProperty(PropertyName = "personId")]
        public int PersonId { get; set; }

        [JsonProperty(PropertyName = "fullname")]
        public string FullName { get; set; }

        [JsonProperty(PropertyName = "roleCode")]
        public string RoleCode { get; set; }

        [JsonProperty(PropertyName = "instrumentCode")]
        public string InstrumentCode { get; set; }

        [JsonProperty(PropertyName = "artistNickName")]
        public string ArtistNickName { get; set; }

        [JsonProperty(PropertyName = "registration")]
        public RegistrationDto Registration { get; set; }

        [JsonProperty(PropertyName = "roleName")]
        public string RoleNameIs { get; set; }

        [JsonProperty(PropertyName = "instrumentName")]
        public string InstrumentName { get; set; }
    }   
}