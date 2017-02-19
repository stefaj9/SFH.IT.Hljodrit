using System;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class ProjectDto
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "projectName")]
        public string ProjectName { get; set; }
        [JsonProperty(PropertyName = "mainArtist")]
        public string MainArtist { get; set; }
        [JsonProperty(PropertyName = "submissionUser")]
        public string SubmissionUser { get; set; }
        [JsonProperty(PropertyName = "lastModificationDate")]
        public DateTime LastModificationDate { get; set; }
    }
}
