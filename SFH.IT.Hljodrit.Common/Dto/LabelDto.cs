using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class LabelDto
    {
        [JsonProperty(PropertyName = "organizationId")]
        public int OrganizationId { get; set; }

        [JsonProperty(PropertyName = "labelName")]
        public string LabelName { get; set; }

    }
}