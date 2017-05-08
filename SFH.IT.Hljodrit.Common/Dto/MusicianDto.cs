using System.Collections.Generic;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// A DTO object representing a musician in the system.
    /// </summary>
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

        /// <summary>
        /// The id of the musician.
        /// </summary>
        [JsonProperty(PropertyName = "musicianId")]
        public int Id { get; set; }

        /// <summary>
        /// The full name of the musician.
        /// </summary>
        [JsonProperty(PropertyName = "fullName")]
        public string Fullname { get; set; }

        [JsonProperty(PropertyName = "highestRoleCode")]
        public string HighestRoleCode { get; set; }

        public string  HighestRoleName { get; set; }

    }
}
