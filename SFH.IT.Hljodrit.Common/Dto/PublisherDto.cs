using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PublisherDto
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("fullName")]
        public string Name { get; set; }
    }
}
