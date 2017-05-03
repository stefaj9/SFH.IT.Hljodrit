using System;
using Newtonsoft.Json;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class ProjectExtendedDto : ProjectDto
    {
        public ProjectExtendedDto() { }

        public ProjectExtendedDto(project_master project) : base(project)
        {
            ProjectStartDate = project.projectstartdate;
            ProjectEndDate = project.projectenddate ?? new DateTime();
            CreatedOn = project.createdon;
            ReviewBy = project.reviewedby ?? "";
            ReviewDate = project.reviewedon ?? new DateTime();
            ReviewComment = project.reviewedcomment ?? "";
            ProjectType = 1;
            ProjectTypeName = "Venjuleg plata";
            Organization = project.organization_master != null ? project.organization_master.name ?? "Ekki skráð" : "Ekki skráð";
            OrganizationId = project.organizationid ?? -1;
        }

        [JsonProperty(PropertyName = "organizationId")]
        public int OrganizationId { get; set; }
        [JsonProperty(PropertyName = "organization")]
        public string Organization { get; set; }
        [JsonProperty(PropertyName = "projectStartDate")]
        public DateTime ProjectStartDate { get; set; }
        [JsonProperty(PropertyName = "projectEndDate")]
        public DateTime? ProjectEndDate { get; set; }
        [JsonProperty(PropertyName = "createdOn")]
        public DateTime CreatedOn { get; set; }
        [JsonProperty(PropertyName = "reviewBy")]
        public string ReviewBy { get; set; }
        [JsonProperty(PropertyName = "reviewDate")]
        public DateTime ReviewDate { get; set; }
        [JsonProperty(PropertyName = "reviewComment")]
        public string ReviewComment { get; set; }
        [JsonProperty(PropertyName = "projectType")]
        public int ProjectType { get; set; }
        [JsonProperty(PropertyName = "projectTypeName")]
        public string ProjectTypeName { get; set; }
    }
}
