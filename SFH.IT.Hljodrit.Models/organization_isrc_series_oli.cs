//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SFH.IT.Hljodrit.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class organization_isrc_series_oli
    {
        public int id { get; set; }
        public int organizationid { get; set; }
        public string purposelabel { get; set; }
        public Nullable<bool> isactive { get; set; }
        public string isrc_countrypart { get; set; }
        public string isrc_organizationpart { get; set; }
        public int isrc_lastusedyear { get; set; }
        public int isrc_lastusednumber { get; set; }
        public string updatedby { get; set; }
        public System.DateTime updatedon { get; set; }
        public string createdby { get; set; }
        public System.DateTime createdon { get; set; }
    }
}
