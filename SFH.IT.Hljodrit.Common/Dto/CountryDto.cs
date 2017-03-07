using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class CountryDto
    {
        [JsonProperty(PropertyName = "numericIsoCode")]
        public int NumericIsoCode { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}
