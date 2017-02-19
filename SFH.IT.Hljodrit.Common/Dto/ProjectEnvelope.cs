using System.Collections.Generic;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class ProjectEnvelope
    {
        [JsonProperty(PropertyName = "currentPage")]
        public int CurrentPage { get; set; }
        [JsonProperty(PropertyName = "maximumPage")]
        public decimal MaximumPage { get; set; }
        [JsonProperty(PropertyName = "projects")]
        public IEnumerable<ProjectDto> Projects { get; set; }
    }
}
