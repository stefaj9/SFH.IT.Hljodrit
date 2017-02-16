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
    
    public partial class media_recording
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public media_recording()
        {
            this.common_cache_mediarecording_detail = new HashSet<common_cache_mediarecording_detail>();
            this.common_workbatch = new HashSet<common_workbatch>();
            this.media_product = new HashSet<media_product>();
            this.recording_party = new HashSet<recording_party>();
            this.media_source = new HashSet<media_source>();
        }
    
        public int id { get; set; }
        public string isrc { get; set; }
        public string iswc { get; set; }
        public Nullable<int> workid { get; set; }
        public string recordingtitle { get; set; }
        public string workingtitle { get; set; }
        public Nullable<int> recordingcountrycode { get; set; }
        public Nullable<int> statusid { get; set; }
        public string trackkey { get; set; }
        public string comment { get; set; }
        public string updatedby { get; set; }
        public System.DateTime updatedon { get; set; }
        public string createdby { get; set; }
        public System.DateTime createdon { get; set; }
        public Nullable<System.DateTime> recordingdate { get; set; }
        public Nullable<System.TimeSpan> duration { get; set; }
        public Nullable<int> mainartist { get; set; }
        public bool markedfordeletion { get; set; }
        public Nullable<int> projecttrackid { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<common_cache_mediarecording_detail> common_cache_mediarecording_detail { get; set; }
        public virtual common_country common_country { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<common_workbatch> common_workbatch { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<media_product> media_product { get; set; }
        public virtual party_mainartist party_mainartist { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<recording_party> recording_party { get; set; }
        public virtual media_status media_status { get; set; }
        public virtual media_work media_work { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<media_source> media_source { get; set; }
    }
}