using System;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class RegistrationDto
    {
        public RegistrationDto() { }


        public RegistrationDto(string comment, string createdBy, DateTime createdOn, string updatedBy, DateTime updatedOn)
        {
            Comment = comment;
            CreatedBy = createdBy;
            CreatedOn = createdOn;
            UpdatedBy = updatedBy;
            UpdatedOn = updatedOn;
        }

        [JsonProperty(PropertyName = "comment")]
        public string Comment { get; set; }

        [JsonProperty(PropertyName = "updatedOn")]
        public DateTime UpdatedOn { get; set; }

        [JsonProperty(PropertyName = "updatedBy")]
        public string UpdatedBy { get; set; }

        [JsonProperty(PropertyName = "createdOn")]
        public DateTime CreatedOn { get; set; }

        [JsonProperty(PropertyName = "createdBy")]
        public string CreatedBy { get; set; }

    }
}