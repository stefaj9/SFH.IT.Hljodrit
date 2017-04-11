using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class AlbumViewModel
    {
        [JsonProperty(PropertyName = "albumId")]
        public int AlbumId { get; set; }

        [JsonProperty(PropertyName = "albumTitle")]
        public string AlbumTitle { get; set; }

        [JsonProperty(PropertyName = "countryOfPublication")]
        public string CountryOfPublication { get; set; }

        [JsonProperty(PropertyName = "countryOfProduction")]
        public string CountryOfProduction { get; set; }

        [JsonProperty(PropertyName = "label")]
        public string Label { get; set; }

        [JsonProperty(PropertyName = "labelId")]
        public int? LabelId { get; set; }

        [JsonProperty(PropertyName = "publisherId")]
        public int PublisherId { get; set; }

        [JsonProperty(PropertyName = "mainArtistId")]
        public int MainArtistId { get; set; }
    }
}