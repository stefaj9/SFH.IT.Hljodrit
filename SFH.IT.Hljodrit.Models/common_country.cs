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
    
    public partial class common_country
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public common_country()
        {
            this.media_product = new HashSet<media_product>();
            this.media_product_package = new HashSet<media_product_package>();
            this.media_product_package1 = new HashSet<media_product_package>();
            this.media_recording = new HashSet<media_recording>();
            this.organization_master = new HashSet<organization_master>();
            this.party_mainartist = new HashSet<party_mainartist>();
        }
    
        public int numericisocode { get; set; }
        public string name_en { get; set; }
        public string name_is { get; set; }
        public bool allowsregistration { get; set; }
        public bool allowsbilling { get; set; }
        public bool allowsshipping { get; set; }
        public string twoletterisocode { get; set; }
        public string threeletterisocode { get; set; }
        public bool published { get; set; }
        public int displayorder { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<media_product> media_product { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<media_product_package> media_product_package { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<media_product_package> media_product_package1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<media_recording> media_recording { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<organization_master> organization_master { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<party_mainartist> party_mainartist { get; set; }
    }
}
