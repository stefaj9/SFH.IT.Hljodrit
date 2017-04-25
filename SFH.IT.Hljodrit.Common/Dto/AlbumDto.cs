﻿using System;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class AlbumDto
    {
        [JsonProperty(PropertyName = "albumId")]
        public int AlbumId { get; set; }

        [JsonProperty(PropertyName = "albumType")]
        public int AlbumType { get; set; }

        [JsonProperty(PropertyName = "albumTitle")]
        public string AlbumTitle { get; set; }

        [JsonProperty(PropertyName = "releaseYear")]
        public int ReleaseYear { get; set; }

        [JsonProperty(PropertyName = "numberOfTracks")]
        public int NumberOfTracks { get; set; }

        [JsonProperty(PropertyName = "mainArtistId")]
        public int? MainArtistId { get; set; }

        [JsonProperty(PropertyName = "mainArtistName")]
        public string MainArtistName { get; set; }
    }
}