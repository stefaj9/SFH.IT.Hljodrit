using System.Collections.Generic;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PersonEnvelope
    {
        public PersonEnvelope(int currentPage, int maximumPage,  IEnumerable<PersonDto> personList)
        {
            CurrentPage = currentPage;
            MaximumPage = maximumPage;
            Persons = personList;
        }

        [JsonProperty(PropertyName = "currentPage")]
        public int CurrentPage { get; set; }

        [JsonProperty(PropertyName = "maximumPage")]
        public int MaximumPage { get; set; }

        [JsonProperty(PropertyName = "persons")]
        public IEnumerable<PersonDto> Persons { get; set; }
    }
}
