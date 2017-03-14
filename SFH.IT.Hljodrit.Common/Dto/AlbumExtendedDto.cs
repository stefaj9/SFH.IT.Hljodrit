using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class AlbumExtendedDto : AlbumDto
    {
        // labelId til ad finna framleidanda
        // ur organization master

        // catalogueNumber

        // country of production, join with commoncountry
        // country of publication sama join og ad ofan
        [JsonProperty(PropertyName = "label")]
        public string Label { get; set; }

        [JsonProperty(PropertyName = "catalogueNumber")]
        public string CatalogueNumber { get; set; }

        [JsonProperty(PropertyName = "countryOfPublication")]
        public string CountryOfPublication { get; set; }

        [JsonProperty(PropertyName = "countryOfProduction")]
        public string CountryOfProduction { get; set; }
    }
}