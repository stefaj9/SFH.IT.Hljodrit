using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class IdentifyDtoLite
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}
