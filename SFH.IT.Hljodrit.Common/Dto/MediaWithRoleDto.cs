using System.Collections.Generic;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// An extension of a mediaDTO that contains the role.
    /// </summary>
    public class MediaWithRoleDto : MediaDto
    {
        /*
        [JsonProperty(PropertyName = "highestRoleCode")]
        public string HighestRoleCode { get; set; }
        [JsonProperty(PropertyName = "highestRoleName")]
        public string HighestRoleName { get; set; }*/
        [JsonProperty(PropertyName = "roles")]
        public IEnumerable<RoleDto> Roles { get; set; }
        [JsonProperty(PropertyName = "instruments")]
        public IEnumerable<InstrumentDto> Instruments { get; set; }
    }
}
