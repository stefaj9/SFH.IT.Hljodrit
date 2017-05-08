using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SFH.IT.Hljodrit.Common.Dto
{
    /// <summary>
    /// An extended DTO of a media object.
    /// </summary>
    public class MediaExtendedDto : MediaDto
    {
        /// <summary>
        /// A DTO object containing the publisher of the media.
        /// </summary>
        [JsonProperty("publisher")]
        public PublisherDto Publisher { get; set; }

        /// <summary>
        /// A DTO object of the label under which the media is published.
        /// </summary>
        [JsonProperty("label")]
        public LabelDto Label { get; set; }

        /// <summary>
        /// All albums that the media appears on.
        /// </summary>
        [JsonProperty("albumAppearances")]
        public IEnumerable<AlbumDto> AlbumAppearances { get; set; }

        /// <summary>
        /// All musicians that appear on the particular media.
        /// </summary>
        [JsonProperty("musicians")]
        public IEnumerable<MusicianCreditsDto> Musicians { get; set; }

        /// <summary>
        /// All composers of the media.
        /// </summary>
        [JsonProperty("composers")]
        public IEnumerable<MusicianCreditsDto> Composers { get; set; }
    }
}
