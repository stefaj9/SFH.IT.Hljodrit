﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class Entities : DbContext
    {
        public Entities()
            : base("name=Entities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<common_airplay_attributes> common_airplay_attributes { get; set; }
        public virtual DbSet<common_cache_airplayreport> common_cache_airplayreport { get; set; }
        public virtual DbSet<common_cache_mediarecording> common_cache_mediarecording { get; set; }
        public virtual DbSet<common_cache_mediarecording_detail> common_cache_mediarecording_detail { get; set; }
        public virtual DbSet<common_cache_profile> common_cache_profile { get; set; }
        public virtual DbSet<common_cache_recordingparty> common_cache_recordingparty { get; set; }
        public virtual DbSet<common_cache_recordingparty_detail> common_cache_recordingparty_detail { get; set; }
        public virtual DbSet<common_country> common_country { get; set; }
        public virtual DbSet<common_language> common_language { get; set; }
        public virtual DbSet<common_trackcache> common_trackcache { get; set; }
        public virtual DbSet<common_workbatch> common_workbatch { get; set; }
        public virtual DbSet<common_zipcodes> common_zipcodes { get; set; }
        public virtual DbSet<import_parties> import_parties { get; set; }
        public virtual DbSet<import_tracks> import_tracks { get; set; }
        public virtual DbSet<media_airplay> media_airplay { get; set; }
        public virtual DbSet<media_alternatetitle> media_alternatetitle { get; set; }
        public virtual DbSet<media_formattype> media_formattype { get; set; }
        public virtual DbSet<media_genre> media_genre { get; set; }
        public virtual DbSet<media_product> media_product { get; set; }
        public virtual DbSet<media_product_package> media_product_package { get; set; }
        public virtual DbSet<media_producttype> media_producttype { get; set; }
        public virtual DbSet<media_recording> media_recording { get; set; }
        public virtual DbSet<media_source> media_source { get; set; }
        public virtual DbSet<media_status> media_status { get; set; }
        public virtual DbSet<media_work> media_work { get; set; }
        public virtual DbSet<organization_cataloguerights> organization_cataloguerights { get; set; }
        public virtual DbSet<organization_isrc_series> organization_isrc_series { get; set; }
        public virtual DbSet<organization_labels> organization_labels { get; set; }
        public virtual DbSet<organization_master> organization_master { get; set; }
        public virtual DbSet<organization_type> organization_type { get; set; }
        public virtual DbSet<party_address> party_address { get; set; }
        public virtual DbSet<party_artistdefaultroles> party_artistdefaultroles { get; set; }
        public virtual DbSet<party_artistgroupmember> party_artistgroupmember { get; set; }
        public virtual DbSet<party_artisttype> party_artisttype { get; set; }
        public virtual DbSet<party_contactmedium> party_contactmedium { get; set; }
        public virtual DbSet<party_groupmembership> party_groupmembership { get; set; }
        public virtual DbSet<party_instrument> party_instrument { get; set; }
        public virtual DbSet<party_instrumenttype> party_instrumenttype { get; set; }
        public virtual DbSet<party_mainartist> party_mainartist { get; set; }
        public virtual DbSet<party_partyroletype> party_partyroletype { get; set; }
        public virtual DbSet<party_pseudonym> party_pseudonym { get; set; }
        public virtual DbSet<party_real> party_real { get; set; }
        public virtual DbSet<project_master> project_master { get; set; }
        public virtual DbSet<project_status> project_status { get; set; }
        public virtual DbSet<project_superuser> project_superuser { get; set; }
        public virtual DbSet<project_superuser_organizations> project_superuser_organizations { get; set; }
        public virtual DbSet<project_track> project_track { get; set; }
        public virtual DbSet<project_track_artist> project_track_artist { get; set; }
        public virtual DbSet<project_user> project_user { get; set; }
        public virtual DbSet<recording_party> recording_party { get; set; }
        public virtual DbSet<revenue_activerate> revenue_activerate { get; set; }
        public virtual DbSet<revenue_plan> revenue_plan { get; set; }
        public virtual DbSet<revenue_releaseusage> revenue_releaseusage { get; set; }
        public virtual DbSet<Difference> Difference { get; set; }
        public virtual DbSet<organization_cataloguerights_backup> organization_cataloguerights_backup { get; set; }
        public virtual DbSet<organization_isrc_series_oli> organization_isrc_series_oli { get; set; }
        public virtual DbSet<organization_label_backup> organization_label_backup { get; set; }
        public virtual DbSet<organization_master_backup> organization_master_backup { get; set; }
        public virtual DbSet<organization_master_oli> organization_master_oli { get; set; }
        public virtual DbSet<NLog> NLog { get; set; }
    
        public virtual int NLog_AddEntry_p(string machineName, string siteName, Nullable<System.DateTime> logged, string level, string userName, string message, string logger, string properties, string serverName, string port, string url, Nullable<bool> https, string serverAddress, string remoteAddress, string callSite, string exception)
        {
            var machineNameParameter = machineName != null ?
                new ObjectParameter("machineName", machineName) :
                new ObjectParameter("machineName", typeof(string));
    
            var siteNameParameter = siteName != null ?
                new ObjectParameter("siteName", siteName) :
                new ObjectParameter("siteName", typeof(string));
    
            var loggedParameter = logged.HasValue ?
                new ObjectParameter("logged", logged) :
                new ObjectParameter("logged", typeof(System.DateTime));
    
            var levelParameter = level != null ?
                new ObjectParameter("level", level) :
                new ObjectParameter("level", typeof(string));
    
            var userNameParameter = userName != null ?
                new ObjectParameter("userName", userName) :
                new ObjectParameter("userName", typeof(string));
    
            var messageParameter = message != null ?
                new ObjectParameter("message", message) :
                new ObjectParameter("message", typeof(string));
    
            var loggerParameter = logger != null ?
                new ObjectParameter("logger", logger) :
                new ObjectParameter("logger", typeof(string));
    
            var propertiesParameter = properties != null ?
                new ObjectParameter("properties", properties) :
                new ObjectParameter("properties", typeof(string));
    
            var serverNameParameter = serverName != null ?
                new ObjectParameter("serverName", serverName) :
                new ObjectParameter("serverName", typeof(string));
    
            var portParameter = port != null ?
                new ObjectParameter("port", port) :
                new ObjectParameter("port", typeof(string));
    
            var urlParameter = url != null ?
                new ObjectParameter("url", url) :
                new ObjectParameter("url", typeof(string));
    
            var httpsParameter = https.HasValue ?
                new ObjectParameter("https", https) :
                new ObjectParameter("https", typeof(bool));
    
            var serverAddressParameter = serverAddress != null ?
                new ObjectParameter("serverAddress", serverAddress) :
                new ObjectParameter("serverAddress", typeof(string));
    
            var remoteAddressParameter = remoteAddress != null ?
                new ObjectParameter("remoteAddress", remoteAddress) :
                new ObjectParameter("remoteAddress", typeof(string));
    
            var callSiteParameter = callSite != null ?
                new ObjectParameter("callSite", callSite) :
                new ObjectParameter("callSite", typeof(string));
    
            var exceptionParameter = exception != null ?
                new ObjectParameter("exception", exception) :
                new ObjectParameter("exception", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("NLog_AddEntry_p", machineNameParameter, siteNameParameter, loggedParameter, levelParameter, userNameParameter, messageParameter, loggerParameter, propertiesParameter, serverNameParameter, portParameter, urlParameter, httpsParameter, serverAddressParameter, remoteAddressParameter, callSiteParameter, exceptionParameter);
        }
    }
}