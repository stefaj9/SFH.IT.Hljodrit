using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// A view model that takes an information for an album from the UI layer and down to the Service layer. For 
    /// example when a user creates an album.
    /// </summary>
    public class AlbumViewModel
    {
        /// <summary>
        /// The id of the album.
        /// </summary>
        [JsonProperty(PropertyName = "albumId")]
        public int AlbumId { get; set; }

        /// <summary>
        /// The title of the album.
        /// </summary>
        [JsonProperty(PropertyName = "albumTitle")]
        public string AlbumTitle { get; set; }

        /// <summary>
        /// The country in which the album is published.
        /// </summary>
        [JsonProperty(PropertyName = "countryOfPublication")]
        public string CountryOfPublication { get; set; }

        /// <summary>
        /// The country in which the album is produced.
        /// </summary>
        [JsonProperty(PropertyName = "countryOfProduction")]
        public string CountryOfProduction { get; set; }

        /// <summary>
        /// The label which the album is published under. A producer can own multiple labels.
        /// </summary>
        [JsonProperty(PropertyName = "label")]
        public string Label { get; set; }

        /// <summary>
        /// The id of the label which the album is published under.
        /// </summary>
        [JsonProperty(PropertyName = "labelId")]
        public int? LabelId { get; set; }

        /// <summary>
        /// The id of the publisher that published the album.
        /// </summary>
        [JsonProperty(PropertyName = "publisherId")]
        public int PublisherId { get; set; }

        /// <summary>
        /// The id of the main artist on the album.
        /// </summary>
        [JsonProperty(PropertyName = "mainArtistId")]
        public int MainArtistId { get; set; }
    }
}