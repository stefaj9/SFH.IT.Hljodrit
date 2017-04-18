using System.Collections.Generic;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MusicianLiteDto
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "instruments")]
        public IEnumerable<string> Instruments { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "roles")]
        public IEnumerable<RoleDto> Roles { get; set; }
    }
}
