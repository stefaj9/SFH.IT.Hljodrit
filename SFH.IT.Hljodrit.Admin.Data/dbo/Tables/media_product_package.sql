CREATE TABLE [dbo].[media_product_package] (
    [id]                   INT            IDENTITY (1, 1) NOT NULL,
    [albumid]              INT            NULL,
    [albumtitle]           NVARCHAR (200) NOT NULL,
    [labelid]              INT            NULL,
    [cataloguenumber]      NVARCHAR (50)  NULL,
    [releasetypecode]      NVARCHAR (5)   NULL,
    [physicallocation]     NVARCHAR (200) NULL,
    [countryofproduction]  INT            NULL,
    [countryofpublication] INT            NULL,
    [releasedate]          DATETIME       NULL,
    [packagestatusid]      INT            NULL,
    [numberoftracks]       INT            NULL,
    [formattypeid]         INT            NULL,
    [issnserialnumber]     NVARCHAR (20)  NULL,
    [comment]              NVARCHAR (250) NULL,
    [updatedby]            NVARCHAR (50)  NOT NULL,
    [updatedon]            DATETIME       NOT NULL,
    [createdby]            NVARCHAR (50)  NOT NULL,
    [createdon]            DATETIME       NOT NULL,
    [mainartistid]         INT            NULL,
    CONSTRAINT [PK_media.release.package] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_media_product_package_countryproduction] FOREIGN KEY ([countryofproduction]) REFERENCES [dbo].[common_country] ([numericisocode]),
    CONSTRAINT [FK_media_product_package_countrypublication] FOREIGN KEY ([countryofpublication]) REFERENCES [dbo].[common_country] ([numericisocode]),
    CONSTRAINT [FK_media_product_package_label] FOREIGN KEY ([labelid]) REFERENCES [dbo].[organization_labels] ([id]),
    CONSTRAINT [FK_media_product_package_party_mainartist] FOREIGN KEY ([mainartistid]) REFERENCES [dbo].[party_mainartist] ([id]),
    CONSTRAINT [package_to_releasetype] FOREIGN KEY ([formattypeid]) REFERENCES [dbo].[media_producttype] ([id]) NOT FOR REPLICATION,
    CONSTRAINT [package_to_status] FOREIGN KEY ([packagestatusid]) REFERENCES [dbo].[media_status] ([id]),
    CONSTRAINT [releasePackage_PhysicalType] FOREIGN KEY ([releasetypecode]) REFERENCES [dbo].[media_formattype] ([typeid])
);


GO
ALTER TABLE [dbo].[media_product_package] NOCHECK CONSTRAINT [package_to_releasetype];


GO
CREATE NONCLUSTERED INDEX [_dta_index_media_release_package_14_1543676547__K1_3]
    ON [dbo].[media_product_package]([id] ASC)
    INCLUDE([albumtitle]);

