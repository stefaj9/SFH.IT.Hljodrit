using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class RoleDto
    {
        [JsonProperty(PropertyName = "roleCode")]
        public string RoleCode { get; set; }
        [JsonProperty(PropertyName = "roleName")]
        public string RoleName { get; set; }
    }
}
