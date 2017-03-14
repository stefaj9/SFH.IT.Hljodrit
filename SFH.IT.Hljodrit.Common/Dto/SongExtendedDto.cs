using Newtonsoft.Json;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class SongExtendedDto : SongDto
    {

        public SongExtendedDto()
        { }

        public SongExtendedDto(media_product song)
        {
            Id = song.id;
            Title = song.title;
            IsrcCode = song.isrc;
            RecordingId = song.recordingid;
            TrackNumber = song.tracknumber;
        }

        [JsonProperty(PropertyName = "isrcCode")]
        public string IsrcCode { get; set; }

        [JsonProperty(PropertyName = "recordingId")]
        public int RecordingId { get; set; }

        [JsonProperty(PropertyName = "trackNumber")]
        public int? TrackNumber { get; set; }
    }
}