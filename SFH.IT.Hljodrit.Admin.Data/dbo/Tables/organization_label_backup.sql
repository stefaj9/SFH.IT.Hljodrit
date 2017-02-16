CREATE TABLE [dbo].[organization_label_backup] (
    [id]                  INT            IDENTITY (1, 1) NOT NULL,
    [organizationid]      INT            NOT NULL,
    [labelname]           NVARCHAR (100) NULL,
    [countrycode]         INT            NULL,
    [dateissued]          DATETIME       NULL,
    [rights_world]        BIT            NOT NULL,
    [rights_ownterritory] BIT            NOT NULL,
    [rights_europe]       BIT            NOT NULL,
    [updatedby]           NVARCHAR (50)  NOT NULL,
    [updatedon]           DATETIME       NOT NULL,
    [createdby]           NVARCHAR (50)  NOT NULL,
    [createdon]           DATETIME       NOT NULL
);

