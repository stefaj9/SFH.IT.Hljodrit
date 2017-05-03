using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PublisherDto
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("fullName")]
        public string Name { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("mainContactName")]
        public string MainContactName { get; set; }

        [JsonProperty("mainContactEmail")]
        public string MainContactEmail { get; set; }

    }
}
