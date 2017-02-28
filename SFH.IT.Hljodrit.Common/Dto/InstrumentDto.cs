using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class InstrumentDto
    {
        [JsonProperty(PropertyName = "idCode")]
        public string IdCode { get; set; }

        [JsonProperty(PropertyName = "instrumentNameEnglish")]
        public string InstrumentNameEnglish { get; set; }

        [JsonProperty(PropertyName = "instrumentNameIcelandic")]
        public string InstrumentNameIcelandic { get; set; }

        [JsonProperty(PropertyName = "descriptionInIcelandic")]
        public string DescriptionInIcelandic { get; set; }
    }
}
