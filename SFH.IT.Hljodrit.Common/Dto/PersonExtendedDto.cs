using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PersonExtendedDto: PersonDto
    {
        public PersonExtendedDto() { }
        public PersonExtendedDto(party_real person, party_contactmedium partyContactmedium) : base(person)
        {
            Ssn = person.uniqueidentifier ?? "";
            DateOfBirth = person.dateofbirth;
            Website = person.website ?? "";
            CountryCode = person.countrycode.ToUpper();
            if (partyContactmedium != null)
            {
                MobileNumber = partyContactmedium.mobilephone ?? "";
                Email = partyContactmedium.emailaddress ?? "";
            }
            else
            {
                MobileNumber = "";
                Email = "";
            }
            
            IsDeceased = person.deceased;
        }

        [RegularExpression("^([0-9]{6}-[0-9]{4})|(^$)$", ErrorMessage = "Kennitala not in correct format.")]
        [JsonProperty(PropertyName = "ssn")]
        public string Ssn { get; set; }

        [JsonProperty(PropertyName = "dateOfBirth")]
        public DateTime? DateOfBirth { get; set; }

        [RegularExpression("^[0-9]*$", ErrorMessage = "Mobile number not in correct format.")]
        [JsonProperty(PropertyName = "mobileNumber")]
        public string MobileNumber { get; set; }

        [EmailAddress(ErrorMessage = "Email not in correct format")]
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "website")]
        public string Website { get; set; }

        [JsonProperty(PropertyName = "isDeceased")]
        public bool? IsDeceased { get; set; }

        [JsonProperty(PropertyName = "countryCode")]
        public string CountryCode { get; set; }
    }
}
