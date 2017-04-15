using System;
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


        [JsonProperty(PropertyName = "ssn")]
        public string Ssn { get; set; }

        [JsonProperty(PropertyName = "dateOfBirth")]
        public DateTime? DateOfBirth { get; set; }

        [JsonProperty(PropertyName = "mobileNumber")]
        public string MobileNumber { get; set; }

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
