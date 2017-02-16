CREATE TABLE [dbo].[organization_labels] (
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
    [createdon]           DATETIME       NOT NULL,
    CONSTRAINT [PK_organization_labelsx] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_organization_labels_organization_master] FOREIGN KEY ([organizationid]) REFERENCES [dbo].[organization_master] ([id])
);

