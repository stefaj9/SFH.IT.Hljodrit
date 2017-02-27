using System.Collections.Generic;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PersonEnvelope
    {
        [JsonProperty(PropertyName = "currentPage")]
        public int CurrentPage { get; set; }
        [JsonProperty(PropertyName = "maximumPage")]
        public int MaximumPage { get; set; }
        [JsonProperty(PropertyName = "persons")]
        public IEnumerable<PersonDto> Persons { get; set; }
    }
}
