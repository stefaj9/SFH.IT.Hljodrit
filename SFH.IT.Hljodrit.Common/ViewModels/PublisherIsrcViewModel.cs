using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.ViewModels
{
    public class PublisherIsrcViewModel
    {
        [JsonProperty(PropertyName = "organizationId")]
        public int OrganizationId { get; set; }
        [JsonProperty(PropertyName = "isrcOrganizationPart")]
        public string IsrcOrganizationPart { get; set; }
    }
}
