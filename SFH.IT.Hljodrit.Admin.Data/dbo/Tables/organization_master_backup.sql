CREATE TABLE [dbo].[organization_master_backup] (
    [id]               INT            IDENTITY (1, 1) NOT NULL,
    [uniqueidentifier] NVARCHAR (30)  NULL,
    [name]             NVARCHAR (100) NOT NULL,
    [organizationtype] INT            NOT NULL,
    [address1]         NVARCHAR (100) NULL,
    [address2]         NVARCHAR (100) NULL,
    [address3]         NVARCHAR (10)  NULL,
    [zipcode]          NVARCHAR (12)  NULL,
    [countrycode]      INT            NULL,
    [telephone]        NVARCHAR (50)  NULL,
    [maincontact]      NVARCHAR (100) NULL,
    [maincontactemail] NVARCHAR (100) NULL,
    [maincontacttel]   NVARCHAR (50)  NULL,
    [website]          NVARCHAR (100) NULL,
    [updatedby]        NVARCHAR (50)  NOT NULL,
    [updatedon]        DATETIME       NOT NULL,
    [createdby]        NVARCHAR (50)  NOT NULL,
    [createdon]        DATETIME       NOT NULL,
    [isactive]         BIT            NULL
);

