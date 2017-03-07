using System;
using Newtonsoft.Json;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PersonExtendedDto: PersonDto
    {
        public PersonExtendedDto(party_real person) : base(person)
        {
            Ssn = person.uniqueidentifier;
            DateOfBirth = person.dateofbirth;
            Website = person.website;
        }


        [JsonProperty(PropertyName = "ssn")]
        public string Ssn { get; set; }

        [JsonProperty(PropertyName = "dateOfBirth")]
        public DateTime? DateOfBirth { get; set; }

        [JsonProperty(PropertyName = "website")]
        public string Website { get; set; }
    }
}
