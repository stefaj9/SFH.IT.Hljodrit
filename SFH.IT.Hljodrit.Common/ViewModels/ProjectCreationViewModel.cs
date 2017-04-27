using System.Collections.Generic;
using Newtonsoft.Json;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Common.ViewModels
{
    public class ProjectCreationViewModel
    {
        [JsonProperty(PropertyName = "basicInfo")]
        public ProjectExtendedDto BasicInfo { get; set; }
        [JsonProperty(PropertyName = "publisherId")]
        public int PublisherId { get; set; }
        [JsonProperty(PropertyName = "songs")]
        public IEnumerable<SongWithPerformersDto> Songs { get; set; }
    }
}
