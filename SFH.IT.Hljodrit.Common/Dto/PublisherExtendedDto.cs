using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class PublisherExtendedDto : PublisherDto
    {
        [JsonProperty("ssn")]
        public string SSN { get; set; }

        [JsonProperty("zipCode")]
        public string ZipCode { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("mainContactPhoneNumber")]
        public string MainContactPhoneNumber { get; set; }

        [JsonProperty("organizationType")]
        public string OrganizationType { get; set; }

        [JsonProperty("labels")]
        public IEnumerable<LabelDto> Labels { get; set; }

        [JsonProperty("albums")]
        public IEnumerable<AlbumDto> Albums { get; set; }

        [JsonProperty("website")]
        public string Website { get; set; }
    }
}
