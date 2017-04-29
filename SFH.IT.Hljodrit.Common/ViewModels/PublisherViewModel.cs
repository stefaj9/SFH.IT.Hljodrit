using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.ViewModels
{
    public class PublisherViewModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("fullName")]
        public string Name { get; set; }

        [JsonProperty("ssn")]
        public string SSN { get; set; }

        [JsonProperty("zipCode")]
        public string ZipCode { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("mainContactName")]
        public string MainContactName { get; set; }

        [JsonProperty("mainContactEmail")]
        public string MainContactEmail { get; set; }

        [JsonProperty("mainContactPhoneNumber")]
        public string MainContactPhoneNumber { get; set; }
    }
}
