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
        public PublisherDto Publisher { get; set; }
        [JsonProperty(PropertyName = "songs")]
        public IEnumerable<SongDto> Songs { get; set; }
    }
}
