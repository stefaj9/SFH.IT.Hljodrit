using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.ViewModels
{
    public class MusicianInfoModifyModel
    {
        [JsonProperty(PropertyName = "instruments")]
        public string Instruments { get; set; }
        [JsonProperty(PropertyName = "role")]
        public string Role { get; set; }
    }
}
