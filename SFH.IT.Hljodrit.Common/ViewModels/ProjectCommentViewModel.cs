﻿using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.ViewModels
{
    public class ProjectCommentViewModel
    {
        [JsonProperty(PropertyName = "comment")]
        public string Comment { get; set; }
    }
}
