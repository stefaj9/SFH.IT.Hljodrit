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
    
    public partial class organization_master
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public organization_master()
        {
            this.organization_cataloguerights = new HashSet<organization_cataloguerights>();
            this.organization_isrc_series = new HashSet<organization_isrc_series>();
            this.organization_labels = new HashSet<organization_labels>();
            this.project_master = new HashSet<project_master>();
            this.project_superuser_organizations = new HashSet<project_superuser_organizations>();
        }
    
        public int id { get; set; }
        public string uniqueidentifier { get; set; }
        public string name { get; set; }
        public int organizationtype { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string address3 { get; set; }
        public string zipcode { get; set; }
        public Nullable<int> countrycode { get; set; }
        public string telephone { get; set; }
        public string maincontact { get; set; }
        public string maincontactemail { get; set; }
        public string maincontacttel { get; set; }
        public string website { get; set; }
        public string updatedby { get; set; }
        public System.DateTime updatedon { get; set; }
        public string createdby { get; set; }
        public System.DateTime createdon { get; set; }
        public Nullable<bool> isactive { get; set; }
        public Nullable<bool> visibletopublic { get; set; }
    
        public virtual common_country common_country { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<organization_cataloguerights> organization_cataloguerights { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<organization_isrc_series> organization_isrc_series { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<organization_labels> organization_labels { get; set; }
        public virtual organization_type organization_type { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<project_master> project_master { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<project_superuser_organizations> project_superuser_organizations { get; set; }
    }
}
