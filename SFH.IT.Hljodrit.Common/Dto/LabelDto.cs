using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// A DTO object representing a label. A publisher cant own multiple labels each of which have their own
    /// isrc series. All albums are released on a particular label under a publisher.
    /// </summary>
    public class LabelDto
    {
        /// <summary>
        /// The id of the organization that owns the label. Organization and Publisher are the same thing. 
        /// </summary>
        [JsonProperty(PropertyName = "organizationId")]
        public int OrganizationId { get; set; }

        /// <summary>
        /// The id of the current label.
        /// </summary>
        [JsonProperty(PropertyName = "labelId")]
        public int LabelId { get; set; }

        /// <summary>
        /// The name of the current label.
        /// </summary>
        [JsonProperty(PropertyName = "labelName")]
        public string LabelName { get; set; }


    }
}