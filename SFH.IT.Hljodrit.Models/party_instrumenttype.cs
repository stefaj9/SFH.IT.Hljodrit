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
    
    public partial class party_instrumenttype
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public party_instrumenttype()
        {
            this.common_cache_recordingparty_detail = new HashSet<common_cache_recordingparty_detail>();
            this.project_track_artist = new HashSet<project_track_artist>();
            this.recording_party = new HashSet<recording_party>();
        }
    
        public string code { get; set; }
        public string parentcode { get; set; }
        public string name_en { get; set; }
        public string name_is { get; set; }
        public string description_is { get; set; }
        public string description_en { get; set; }
        public bool active { get; set; }
        public bool imageavailable { get; set; }
        public string updatedby { get; set; }
        public Nullable<System.DateTime> updatedon { get; set; }
        public string createdby { get; set; }
        public Nullable<System.DateTime> createdon { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<common_cache_recordingparty_detail> common_cache_recordingparty_detail { get; set; }
        public virtual party_instrumenttype party_instrumenttype1 { get; set; }
        public virtual party_instrumenttype party_instrumenttype2 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<project_track_artist> project_track_artist { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<recording_party> recording_party { get; set; }
    }
}
