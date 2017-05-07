using System;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// An albumDto object represents an album object.
    /// </summary>
    public class AlbumDto
    {
        /// <summary>
        /// The id of the album
        /// </summary>
        [JsonProperty(PropertyName = "albumId")]
        public int AlbumId { get; set; }

        /// <summary>
        /// The type of media contained on the album. F.e. CD, Vinyl album, Cassette etc. References types from
        /// the 'media_producttype' table.
        /// </summary>
        [JsonProperty(PropertyName = "albumType")]
        public int AlbumType { get; set; }

        /// <summary>
        /// The title of the album
        /// </summary>
        [JsonProperty(PropertyName = "albumTitle")]
        public string AlbumTitle { get; set; }

        /// <summary>
        /// The release year of the album
        /// </summary>
        [JsonProperty(PropertyName = "releaseYear")]
        public int ReleaseYear { get; set; }

        /// <summary>
        /// The number of tracks on the album
        /// </summary>
        [JsonProperty(PropertyName = "numberOfTracks")]
        public int NumberOfTracks { get; set; }

        /// <summary>
        /// The id of the main artist on the album
        /// </summary>
        [JsonProperty(PropertyName = "mainArtistId")]
        public int? MainArtistId { get; set; }

        /// <summary>
        /// The full name of the main artist on the album
        /// </summary>
        [JsonProperty(PropertyName = "mainArtistName")]
        public string MainArtistName { get; set; }
    }
}