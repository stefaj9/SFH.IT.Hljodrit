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
    
    public partial class organization_type
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public organization_type()
        {
            this.organization_master = new HashSet<organization_master>();
        }
    
        public int id { get; set; }
        public string typename_is { get; set; }
        public string typename_en { get; set; }
        public Nullable<int> subtype { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<organization_master> organization_master { get; set; }
    }
}