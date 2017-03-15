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
            AlbumId = song.packageid ?? -1;
            TrackNumber = song.tracknumber ?? -1;
        }

        [JsonProperty(PropertyName = "isrcCode")]
        public string IsrcCode { get; set; }

        [JsonProperty(PropertyName = "albumId")]
        public int? AlbumId { get; set; }

    }
}