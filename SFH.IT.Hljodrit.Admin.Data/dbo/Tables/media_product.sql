CREATE TABLE [dbo].[media_product] (
    [id]                  INT            IDENTITY (1, 1) NOT NULL,
    [isrc]                NVARCHAR (20)  NULL,
    [globalproductid]     NVARCHAR (30)  NULL,
    [recordingid]         INT            NOT NULL,
    [title]               NVARCHAR (200) NULL,
    [tracknumber]         INT            NULL,
    [sidenumber]          INT            NULL,
    [labelid]             INT            NULL,
    [cataloguenumber]     NVARCHAR (50)  NULL,
    [mediaproducttypeid]  INT            NULL,
    [packageid]           INT            NULL,
    [releasedate]         DATETIME       NULL,
    [countryofproduction] INT            NULL,
    [revenuetypeid]       INT            NULL,
    [trackkey]            NVARCHAR (50)  NULL,
    [statusid]            INT            NULL,
    [comment]             NVARCHAR (250) NULL,
    [updatedby]           NVARCHAR (20)  NOT NULL,
    [updatedon]           DATETIME       NOT NULL,
    [createdby]           NVARCHAR (20)  NOT NULL,
    [createdon]           DATETIME       NOT NULL,
    CONSTRAINT [PK_media.release] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_media_product_common_country] FOREIGN KEY ([countryofproduction]) REFERENCES [dbo].[common_country] ([numericisocode]),
    CONSTRAINT [release_revenuetype] FOREIGN KEY ([revenuetypeid]) REFERENCES [dbo].[revenue_plan] ([id]),
    CONSTRAINT [release_status] FOREIGN KEY ([statusid]) REFERENCES [dbo].[media_status] ([id]),
    CONSTRAINT [release_to_recording] FOREIGN KEY ([recordingid]) REFERENCES [dbo].[media_recording] ([id]) ON DELETE CASCADE,
    CONSTRAINT [release_to_releasetype] FOREIGN KEY ([mediaproducttypeid]) REFERENCES [dbo].[media_producttype] ([id]),
    CONSTRAINT [track_to_package] FOREIGN KEY ([packageid]) REFERENCES [dbo].[media_product_package] ([id])
);


GO
ALTER TABLE [dbo].[media_product] NOCHECK CONSTRAINT [release_revenuetype];


GO
ALTER TABLE [dbo].[media_product] NOCHECK CONSTRAINT [track_to_package];


GO
CREATE NONCLUSTERED INDEX [IX_recordingID]
    ON [dbo].[media_product]([recordingid] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_media_productYear]
    ON [dbo].[media_product]([releasedate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_media_productName]
    ON [dbo].[media_product]([title] ASC);


GO
CREATE NONCLUSTERED INDEX [_dta_index_media_release_14_843150049__K10_K4_1]
    ON [dbo].[media_product]([packageid] ASC, [recordingid] ASC)
    INCLUDE([id]);

