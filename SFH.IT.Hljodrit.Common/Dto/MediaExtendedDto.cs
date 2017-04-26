using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MediaExtendedDto : MediaDto
    {
        [JsonProperty("publisher")]
        public PublisherDto Publisher { get; set; }
        [JsonProperty("label")]
        public LabelDto Label { get; set; }
        [JsonProperty("albumAppearances")]
        public IEnumerable<AlbumDto> AlbumAppearances { get; set; }
        [JsonProperty("musicians")]
        public IEnumerable<MusicianCreditsDto> MusicianDtos { get; set; }
    }
}
