using System;
using Newtonsoft.Json;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class ProjectDto
    {
        public ProjectDto() { }

        public ProjectDto(project_master project)
        {
            Id = project.id;
            ProjectName = project.projectname ?? "";
            MainArtist = project.mainartist ?? "";
            SubmissionUser = project.createdby ?? "";
            LastModificationDate = project.updatedon;
            ProjectStatus = project.statuscode;
        }
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
        [JsonProperty(PropertyName = "projectStatus")]
        public string ProjectStatus { get; set; }
    }
}
