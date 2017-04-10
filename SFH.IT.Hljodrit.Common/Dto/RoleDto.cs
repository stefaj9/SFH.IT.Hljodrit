using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class RoleDto
    {
        [JsonProperty(PropertyName = "code")]
        public string RoleCode { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string RoleName { get; set; }
    }
}
