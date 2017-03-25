using System.Collections.Generic;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MusicianDto
    {
        public MusicianDto() { }

        public MusicianDto(int musicianId, string fullName, string highestRoleCode, string highestRoleName)
        {
            Id = musicianId;
            Fullname = fullName;
            HighestRoleCode = highestRoleCode;
            HighestRoleName = highestRoleName;
        }

        [JsonProperty(PropertyName = "musicianId")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "fullName")]
        public string Fullname { get; set; }

        [JsonProperty(PropertyName = "highestRoleCode")]
        public string HighestRoleCode { get; set; }

        public string  HighestRoleName { get; set; }

    }
}
