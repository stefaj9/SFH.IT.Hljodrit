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
    
    public partial class common_trackcache
    {
        public int autoid { get; set; }
        public string username { get; set; }
        public int id { get; set; }
        public string title { get; set; }
        public string isrc { get; set; }
        public Nullable<System.TimeSpan> duration { get; set; }
        public Nullable<System.DateTime> recordingdate { get; set; }
        public string mainartist { get; set; }
        public string mainartistuniqueid { get; set; }
        public Nullable<bool> rolesexist { get; set; }
    }
}
