using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class CreditsDto
    {

        public CreditsDto()
        {
            Instruments = new List<InstrumentDto>();
        }

        [JsonProperty(PropertyName = "recordingId")]
        public int RecordingId { get; set; }

        [JsonProperty(PropertyName = "roleCode")]
        public string RoleCode { get; set; }

        [JsonProperty(PropertyName = "registration")]
        public RegistrationDto Registration { get; set; }

        [JsonProperty(PropertyName = "instruments")]
        public IEnumerable<InstrumentDto> Instruments { get; set; }
    }
}