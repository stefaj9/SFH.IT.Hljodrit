using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class ProjectMasterDto
    {
        [JsonProperty(PropertyName = "projectName")]
        public string ProjectName { get; set; }
    }
}
