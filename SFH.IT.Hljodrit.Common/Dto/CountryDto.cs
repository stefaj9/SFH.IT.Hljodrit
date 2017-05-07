using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// A dto object that represents a country and various metadata related to it. 
    /// </summary>
    public class CountryDto
    {
        /// <summary>
        /// The numeric ISO code for the country f.e. '354' for Iceland/
        /// </summary>
        [JsonProperty(PropertyName = "numericIsoCode")]
        public int NumericIsoCode { get; set; }

        /// <summary>
        /// A 2 letter code for the country. F.e. IS for Iceland.
        /// </summary>
        [JsonProperty(PropertyName = "twoLetterCode")]
        public string TwoLetterCode { get; set; }

        /// <summary>
        /// The name of the country.
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}
