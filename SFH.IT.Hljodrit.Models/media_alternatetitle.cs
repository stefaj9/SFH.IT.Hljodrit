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
    
    public partial class media_alternatetitle
    {
        public int id { get; set; }
        public Nullable<int> releaseid { get; set; }
        public string isrc { get; set; }
        public string alternatetitle { get; set; }
        public string updatedby { get; set; }
        public System.DateTime updatedon { get; set; }
        public string createdby { get; set; }
        public System.DateTime createdon { get; set; }
    
        public virtual media_product media_product { get; set; }
    }
}
