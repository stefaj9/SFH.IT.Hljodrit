using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PublisherLabelDto
    {
        [JsonProperty(PropertyName = "labelId")]
        public int LabelId { get; set; }
        [JsonProperty(PropertyName = "organizationId")]
        public int OrganizationId { get; set; }
        [JsonProperty(PropertyName = "labelName")]
        public string LabelName { get; set; }
    }
}
