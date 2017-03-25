using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.ViewModels
{
    public class PersonRegisterViewModel
    {
        [Required(ErrorMessage = "Nafn er nauðsynlegt.")]
        [MinLength(2, ErrorMessage = "Nafn er of stutt.")]
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [RegularExpression("^([0-9]{6}-[0-9]{4})|([0-9]{10})$", ErrorMessage = "Kennitala ekki á réttu formi.")]
        [JsonProperty(PropertyName = "ssn")]
        public string Ssn { get; set; }
        [Required(ErrorMessage = "Heimilisfang er nauðsynlegt.")]
        [JsonProperty(PropertyName = "address")]
        public string Address { get; set; }
        [Required(ErrorMessage = "Póstnúmer er nauðsynlegt.")]
        [JsonProperty(PropertyName = "zipCode")]
        public string Zipcode { get; set; }
        [Required(ErrorMessage = "Landaval er nauðsynlegt.")]
        [JsonProperty(PropertyName = "numericCountryIsoCode")]
        public int NumericCountryIsoCode { get; set; }
        [Required(ErrorMessage = "Val á stöðu (isDeceased) er nauðsynleg.")]
        [JsonProperty(PropertyName = "isDeceased")]
        public bool IsDeceased { get; set; }
    }
}
