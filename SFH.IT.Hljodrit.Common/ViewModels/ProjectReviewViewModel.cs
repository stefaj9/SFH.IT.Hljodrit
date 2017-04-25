using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.ViewModels
{
    public class ProjectReviewViewModel
    {
        [JsonProperty(PropertyName = "labelId")]
        public int LabelId { get; set; }
        [JsonProperty(PropertyName = "organizationId")]
        public int OrganizationId { get; set; }
        [JsonProperty(PropertyName = "isrcSeriesId")]
        public int IsrcSeriesId { get; set; }
        [JsonProperty(PropertyName = "reviewComment")]
        public string ReviewComment { get; set; }
    }
}
