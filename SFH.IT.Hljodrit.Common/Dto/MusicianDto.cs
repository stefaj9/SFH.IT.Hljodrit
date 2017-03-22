using System.Collections.Generic;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MusicianDto
    {
        public MusicianDto()
        {
            Credits = new List<CreditsDto>();
        }

        public MusicianDto(int musicianId, string fullName, string highestRoleCode)
        {
            Id = musicianId;
            Fullname = fullName;
            HighestRoleCode = highestRoleCode;
            Credits = new List<CreditsDto>();
        }

        [JsonProperty(PropertyName = "musicianId")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "fullName")]
        public string Fullname { get; set; }

        [JsonProperty(PropertyName = "highestRoleCode")]
        public string HighestRoleCode { get; set; }

        [JsonProperty(PropertyName = "credits")]
        public ICollection<CreditsDto> Credits { get; set; }
    }
}