using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MusicianExtendedDto
    {
        public MusicianExtendedDto()
        {
            Songs = new Dictionary<string, IEnumerable<string>>();
        }
        [JsonProperty(PropertyName = "fullName")]
        public string Fullname { get; set; }

        [JsonProperty(PropertyName = "songs")]
        public Dictionary<string, IEnumerable<string>> Songs;
    }
}