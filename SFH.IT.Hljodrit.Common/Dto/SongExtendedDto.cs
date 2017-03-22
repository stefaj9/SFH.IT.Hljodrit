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
            AlbumId = song.packageid ?? -1;
            TrackNumber = song.tracknumber ?? -1;
        }

        [JsonProperty(PropertyName = "sideNumber")]
        public int  SideNumber { get; set; }

    }
}