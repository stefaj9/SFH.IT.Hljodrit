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
        }
        [JsonProperty(PropertyName = "projectStartDate")]
        public DateTime ProjectStartDate { get; set; }
        [JsonProperty(PropertyName = "projectEndDate")]
        public DateTime ProjectEndDate { get; set; }
        [JsonProperty(PropertyName = "createdOn")]
        public DateTime CreatedOn { get; set; }
        [JsonProperty(PropertyName = "reviewBy")]
        public string ReviewBy { get; set; }
        [JsonProperty(PropertyName = "reviewDate")]
        public DateTime ReviewDate { get; set; }
        [JsonProperty(PropertyName = "reviewComment")]
        public string ReviewComment { get; set; }
    }
}
