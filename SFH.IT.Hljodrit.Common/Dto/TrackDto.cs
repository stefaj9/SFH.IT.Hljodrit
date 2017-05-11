using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// An object that contains a single track.
    /// </summary>
    public class TrackDto
    {
        /// <summary>
        /// The id of the track.
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        /// <summary>
        /// The id of the project that the track appears on.
        /// </summary>
        [Required]
        [JsonProperty(PropertyName = "projectId")]
        public int ProjectId { get; set; }

        /// <summary>
        /// The name of the track.
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [JsonProperty(PropertyName = "trackName")]
        public string TrackName { get; set; }

        /// <summary>
        /// The isrc code for the track.
        /// </summary>
        [JsonProperty(PropertyName = "isrc")]
        public string Isrc { get; set; }

        /// <summary>
        /// The duration of the track.
        /// </summary>
        [JsonProperty(PropertyName = "duration")]
        public TimeSpan? Duration { get; set; }

        [JsonProperty(PropertyName = "doNotPublish")]
        public bool DoNotPublish { get; set; }

        [Required]
        [JsonProperty(PropertyName = "trackOrder")]
        public int TrackOrder { get; set; }
    }
}