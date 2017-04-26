using System.Collections.Generic;
using Newtonsoft.Json;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Common.ViewModels
{
    public class MusicianRegisterViewModel
    {
        [JsonProperty(PropertyName = "id")]
        public int PartyRealId { get; set; }
        [JsonProperty(PropertyName = "instrument")]
        public InstrumentDto Instrument { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "role")]
        public RoleDto Role { get; set; }
    }
}
