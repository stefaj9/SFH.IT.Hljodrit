using Newtonsoft.Json;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PersonDto
    {
        public PersonDto()
        { }

        public PersonDto(party_real person)
        {
            Id = person.id;
            Fullname = person.fullname;
            PostalAddressLine1 = person.postaladdressline1;
            ZipCode = person.zipcode;
            Area = person.area;
        }

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





