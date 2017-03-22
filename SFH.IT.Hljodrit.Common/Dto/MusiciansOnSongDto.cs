using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MusiciansOnSongDto 
    {

        public MusiciansOnSongDto()
        {
            Musicians = new List<MusicianDto>();
        }

        [JsonProperty(PropertyName = "songId")]
        public int SongId { get; set; }

        [JsonProperty(PropertyName = "musicians")]
        public ICollection<MusicianDto> Musicians { get; set; }
    }
}


