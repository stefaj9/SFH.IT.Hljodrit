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
    
    public partial class party_partyroletype
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public party_partyroletype()
        {
            this.common_cache_recordingparty_detail = new HashSet<common_cache_recordingparty_detail>();
            this.project_track_artist = new HashSet<project_track_artist>();
            this.recording_party = new HashSet<recording_party>();
        }
    
        public string rolecode { get; set; }
        public string rolename_en { get; set; }
        public string rolename_is { get; set; }
        public Nullable<int> revenuplanid { get; set; }
        public Nullable<bool> active { get; set; }
        public Nullable<int> sortorder { get; set; }
        public string equivalent_role { get; set; }
        public bool adminonly { get; set; }
        public int MusicianRoleGroupId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<common_cache_recordingparty_detail> common_cache_recordingparty_detail { get; set; }
        public virtual MusicianRoleGroup MusicianRoleGroup { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<project_track_artist> project_track_artist { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<recording_party> recording_party { get; set; }
    }
}
