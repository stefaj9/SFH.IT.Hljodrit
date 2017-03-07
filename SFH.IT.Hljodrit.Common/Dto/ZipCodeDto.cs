using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class ZipCodeDto
    {
        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }
        [JsonProperty(PropertyName = "area")]
        public string Area { get; set; }
    }
}
