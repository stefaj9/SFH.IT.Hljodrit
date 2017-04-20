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
    
    public partial class media_product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public media_product()
        {
            this.media_alternatetitle = new HashSet<media_alternatetitle>();
        }
    
        public int id { get; set; }
        public string isrc { get; set; }
        public string globalproductid { get; set; }
        public int recordingid { get; set; }
        public string title { get; set; }
        public Nullable<int> tracknumber { get; set; }
        public Nullable<int> sidenumber { get; set; }
        public Nullable<int> labelid { get; set; }
        public string cataloguenumber { get; set; }
        public Nullable<int> mediaproducttypeid { get; set; }
        public Nullable<int> packageid { get; set; }
        public Nullable<System.DateTime> releasedate { get; set; }
        public Nullable<int> countryofproduction { get; set; }
        public Nullable<int> revenuetypeid { get; set; }
        public string trackkey { get; set; }
        public Nullable<int> statusid { get; set; }
        public string comment { get; set; }
        public string updatedby { get; set; }
        public System.DateTime updatedon { get; set; }
        public string createdby { get; set; }
        public System.DateTime createdon { get; set; }
        public bool is_deleted { get; set; }
    
        public virtual common_country common_country { get; set; }
        public virtual media_airplay media_airplay { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<media_alternatetitle> media_alternatetitle { get; set; }
        public virtual revenue_plan revenue_plan { get; set; }
        public virtual media_status media_status { get; set; }
        public virtual media_recording media_recording { get; set; }
        public virtual media_producttype media_producttype { get; set; }
        public virtual media_product_package media_product_package { get; set; }
    }
}
