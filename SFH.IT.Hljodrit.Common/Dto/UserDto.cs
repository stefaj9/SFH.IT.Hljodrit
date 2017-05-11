using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class UserDto
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }
    }
}
