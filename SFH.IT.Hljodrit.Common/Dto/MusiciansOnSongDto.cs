using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MusiciansOnSongDto 
    {

        public MusiciansOnSongDto()
        {
            Credits = new List<MusicianCreditsDto>();
        }

        public MusiciansOnSongDto(int partyRealId, int musicianId, string fullName, string highestRoleCode, string highestRoleName, ICollection<MusicianCreditsDto> credits )
        {
            Id = partyRealId;
            MusicianId = musicianId;
            Fullname = fullName;
            HighestRoleCode = highestRoleCode;
            HighestRoleName = highestRoleName;
            Credits = credits;
        }

        [JsonProperty(PropertyName = "partyRealId")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "musicianId")]
        public int MusicianId { get; set; }

        [JsonProperty(PropertyName = "fullName")]
        public string Fullname { get; set; }

        [JsonProperty(PropertyName = "highestRoleCode")]
        public string HighestRoleCode { get; set; }
        [JsonProperty(PropertyName = "highestRoleName")]
        public string HighestRoleName { get; set; }
        [JsonProperty(PropertyName = "credits")]
        public ICollection<MusicianCreditsDto> Credits { get; set; }

    }
}


