using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class InstrumentDto
    {
        public InstrumentDto() { }

        public InstrumentDto(string code, string instrumentEnglish, string instrumentIcelandic, string description)
        {
            IdCode = code;
            InstrumentNameEnglish = instrumentEnglish;
            InstrumentNameIcelandic = instrumentIcelandic;
            DescriptionInIcelandic = description;
        }

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
