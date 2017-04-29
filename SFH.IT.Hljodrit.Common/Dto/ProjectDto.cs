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
            MainArtistId = project.party_mainartist?.id ?? -1;
            SubmissionUser = project.createdby ?? "";
            LastModificationDate = project.updatedon;
            ProjectStatus = project.statuscode;
            ProjectStatusName = project.project_status?.statusname ?? "";
        }
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "projectName")]
        public string ProjectName { get; set; }
        [JsonProperty(PropertyName = "mainArtist")]
        public string MainArtist { get; set; }
        [JsonProperty(PropertyName = "mainArtistId")]
        public int? MainArtistId { get; set; }
        [JsonProperty(PropertyName = "submissionUser")]
        public string SubmissionUser { get; set; }
        [JsonProperty(PropertyName = "lastModificationDate")]
        public DateTime LastModificationDate { get; set; }
        [JsonProperty(PropertyName = "projectStatus")]
        public string ProjectStatus { get; set; }
        [JsonProperty(PropertyName = "projectStatusName")]
        public string ProjectStatusName { get; set; }
        [JsonProperty(PropertyName = "isWorkingTitle")]
        public bool IsWorkingTitle { get; set; }
    }
}
