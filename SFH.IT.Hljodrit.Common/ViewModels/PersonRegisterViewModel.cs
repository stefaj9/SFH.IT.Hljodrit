using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.ViewModels
{
    public class PersonRegisterViewModel
    {
        [Required]
        [MinLength(2, ErrorMessage = "Name was too short")]
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [Required]
        [RegularExpression("^([0-9]{6}-[0-9]{4})|([0-9]{10})$", ErrorMessage = "Ssn was not properly formatted.")]
        [JsonProperty(PropertyName = "ssn")]
        public string Ssn { get; set; }
        [Required]
        [JsonProperty(PropertyName = "address")]
        public string Address { get; set; }
        [Required]
        [JsonProperty(PropertyName = "zipCode")]
        public string Zipcode { get; set; }
        [Required]
        [JsonProperty(PropertyName = "numericCountryIsoCode")]
        public int NumericCountryIsoCode { get; set; }
    }
}
