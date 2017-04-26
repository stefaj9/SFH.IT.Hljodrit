using System.Collections.Generic;
using Newtonsoft.Json;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Common.ViewModels
{
    public class AlbumCreationViewModel
    {
        [JsonProperty(PropertyName = "basicInfo")]
        public AlbumExtendedDto BasicInfo { get; set; }
        [JsonProperty(PropertyName = "publisher")]
        public PublisherIsrcSeriesDto Publisher { get; set; }
        [JsonProperty(PropertyName = "publisherLabelId")]
        public int PublisherLabelId { get; set; }
        [JsonProperty(PropertyName = "songs")]
        public IEnumerable<SongWithPerformersDto> Songs { get; set; }
        [JsonProperty(PropertyName = "reviewComment")]
        public string ReviewComment { get; set; }
    }
}
