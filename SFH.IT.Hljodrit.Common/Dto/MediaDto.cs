using System;
using Newtonsoft.Json;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// A media object represents any media in the system. A media object is something that has been recorded but not necessarily
    /// published. Basically any recording whether it appears on an album or has not yet been published.
    /// </summary>
    public class MediaDto
    {
        public MediaDto() { }
        public MediaDto(media_recording mr, int totalMusicians = 0)
        {
            this.Id = mr.id;
            this.Title = mr.recordingtitle;
            this.Duration = mr.duration;
            this.MainArtistId = mr.mainartist ?? -1;
            this.ReleaseDate = mr.recordingdate;
            this.Isrc = mr.isrc;
            this.TotalMusicians = totalMusicians;
        }

        /// <summary>
        /// The id of the current media.
        /// </summary>
        [JsonProperty("mediaId")]
        public int Id { get; set; }

        /// <summary>
        /// The title of the current media.
        /// </summary>
        [JsonProperty("mediaTitle")]
        public string Title { get; set; }

        /// <summary>
        /// The duration of the current media.
        /// </summary>
        [JsonProperty("duration")]
        public TimeSpan? Duration { get; set; }

        /// <summary>
        /// The id of the main artist of the current media.
        /// </summary>
        [JsonProperty(PropertyName = "mainArtistId")]
        public int MainArtistId { get; set; }

        /// <summary>
        /// The name of the main artist featured on the current media.
        /// </summary>
        [JsonProperty("mainArtist")]
        public string MainArtist { get; set; }

        /// <summary>
        /// The date on which the media was released if it has been released. Otherwise null.
        /// </summary>
        [JsonProperty("releaseDate")]
        public DateTime? ReleaseDate { get; set; }

        /// <summary>
        /// The isrc code of the media.
        /// </summary>
        [JsonProperty("isrc")]
        public string Isrc { get; set; }

        /// <summary>
        /// The total number of musicians who appear on the media.
        /// </summary>
        [JsonProperty("totalMusicians")]
        public int TotalMusicians { get; set; }
    }
}
