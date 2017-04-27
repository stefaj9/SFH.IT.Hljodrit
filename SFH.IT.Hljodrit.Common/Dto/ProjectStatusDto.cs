using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class ProjectStatusDto
    {
        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}
