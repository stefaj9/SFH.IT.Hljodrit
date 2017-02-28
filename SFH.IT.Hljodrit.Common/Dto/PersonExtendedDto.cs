using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PersonExtendedDto: PersonDto
    {
        [JsonProperty(PropertyName = "ssn")]
        public string Ssn { get; set; }

        [JsonProperty(PropertyName = "dateOfBirth")]
        public DateTime? DateOfBirth { get; set; }

        [JsonProperty(PropertyName = "website")]
        public string Website { get; set; }
    }
}
