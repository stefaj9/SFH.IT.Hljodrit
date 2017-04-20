using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PublisherIsrcSeriesDto
    {
        [JsonProperty(PropertyName = "isrcSeriesId")]
        public int IsrcSeriesId { get; set; }
        [JsonProperty(PropertyName = "organizationId")]
        public int OrganizationId { get; set; }
        [JsonProperty(PropertyName = "purposeLabel")]
        public string PurposeLabel { get; set; }
        [JsonProperty(PropertyName = "isrcOrganizationPart")]
        public string IsrcOrganizationPart { get; set; }
        [JsonProperty(PropertyName = "lastIsrcNumber")]
        public int LastIsrcNumber { get; set; }
    }
}
