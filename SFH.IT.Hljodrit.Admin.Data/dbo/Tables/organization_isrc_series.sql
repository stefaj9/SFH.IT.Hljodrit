﻿CREATE TABLE [dbo].[organization_isrc_series] (
    [id]                    INT            IDENTITY (1, 1) NOT NULL,
    [organizationid]        INT            NOT NULL,
    [purposelabel]          NVARCHAR (100) NULL,
    [isactive]              BIT            NULL,
    [isrc_countrypart]      NVARCHAR (2)   NOT NULL,
    [isrc_organizationpart] NVARCHAR (3)   NOT NULL,
    [isrc_lastusedyear]     INT            NOT NULL,
    [isrc_lastusednumber]   INT            NOT NULL,
    [updatedby]             NVARCHAR (50)  NOT NULL,
    [updatedon]             DATETIME       NOT NULL,
    [createdby]             NVARCHAR (50)  NOT NULL,
    [createdon]             DATETIME       NOT NULL,
    CONSTRAINT [PK_organization_isrc_series] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_organization_isrc_series_organization_master] FOREIGN KEY ([organizationid]) REFERENCES [dbo].[organization_master] ([id])
);

