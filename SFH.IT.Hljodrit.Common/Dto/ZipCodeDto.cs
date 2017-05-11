using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// Contains a single zip code object.
    /// </summary>
    public class ZipCodeDto
    {
        /// <summary>
        /// The literal zip code f.e. 101
        /// </summary>
        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }

        /// <summary>
        /// The area for the code f.e. Reykjavik
        /// </summary>
        [JsonProperty(PropertyName = "area")]
        public string Area { get; set; }
    }
}
