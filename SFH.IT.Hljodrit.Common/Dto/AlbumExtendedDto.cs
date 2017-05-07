using System;
using System.Reflection.Emit;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// An extended album object that features more extensive information on an album
    /// </summary>
    public class AlbumExtendedDto : AlbumDto
    {
        /// <summary>
        /// The id of the label that the particular album is released under. 
        /// </summary>
        [JsonProperty(PropertyName = "labelId")]
        public int? LabelId { get; set; }

        /// <summary>
        /// The name of the label that released the album.
        /// </summary>
        [JsonProperty(PropertyName = "label")]
        public string Label { get; set; }

        /// <summary>
        ///  We don't know exactly how these catalogye numbers are generated or used. But they are
        /// apparantly a must.
        /// </summary>
        [JsonProperty(PropertyName = "catalogueNumber")]
        public string CatalogueNumber { get; set; }

        /// <summary>
        /// The country in which the album is published.
        /// </summary>
        [JsonProperty(PropertyName = "countryOfPublication")]
        public string CountryOfPublication { get; set; }

        /// <summary>
        /// The date on which the album was published.
        /// </summary>
        [JsonProperty(PropertyName = "releaseDate")]
        public DateTime? ReleaseDate { get; set; }

        /// <summary>
        /// The country in which the album was produced.
        /// </summary>
        [JsonProperty(PropertyName = "countryOfProduction")]
        public string CountryOfProduction { get; set; }

        /// <summary>
        /// The id of the publisher which published the album. A publisher can own multiple labels.
        /// </summary>
        [JsonProperty(PropertyName = "publisherId")]
        public int? PublisherId { get; set; }

        /// <summary>
        /// The name of the publisher who published the album.
        /// </summary>
        [JsonProperty(PropertyName = "publisher")]
        public string Publisher { get; set; }

        /// <summary>
        /// Contains various registration information on the particular album such as a comment, who created, updated
        /// time of creation and update etc.
        /// </summary>
        [JsonProperty(PropertyName = "registrationData")]
        public RegistrationDto Registration { get; set; }
    }
}