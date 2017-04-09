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
            Isrc = song.isrc;
            Duration = song.media_recording.duration;
            MainArtist = song.media_recording.party_mainartist.artistname;
            if (song.media_recording.mainartist != null) MainArtistId = (int) song.media_recording.mainartist;
            ReleaseDate = song.releasedate;
        }

        [JsonProperty(PropertyName = "sideNumber")]
        public int  SideNumber { get; set; }

    }
}