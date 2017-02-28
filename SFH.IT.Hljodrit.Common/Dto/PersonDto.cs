
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PersonDto
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "fullName")]
        public string Fullname { get; set; }

        [JsonProperty(PropertyName = "postalAddressLine1")]
        public string PostalAddressLine1 { get; set; }

        [JsonProperty(PropertyName = "zipCode")]
        public string ZipCode { get; set; }

        [JsonProperty(PropertyName = "area")]
        public string Area { get; set; }  
    }
}





