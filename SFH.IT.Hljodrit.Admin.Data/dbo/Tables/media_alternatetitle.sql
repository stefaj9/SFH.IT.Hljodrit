CREATE TABLE [dbo].[media_alternatetitle] (
    [id]             INT            IDENTITY (1, 1) NOT NULL,
    [releaseid]      INT            NULL,
    [isrc]           NVARCHAR (20)  NULL,
    [alternatetitle] NVARCHAR (200) NULL,
    [updatedby]      NVARCHAR (50)  NOT NULL,
    [updatedon]      DATETIME       NOT NULL,
    [createdby]      NVARCHAR (50)  NOT NULL,
    [createdon]      DATETIME       NOT NULL,
    CONSTRAINT [PK_media.titlealias] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [alternatetitle_to_release] FOREIGN KEY ([releaseid]) REFERENCES [dbo].[media_product] ([id])
);


GO
CREATE NONCLUSTERED INDEX [IX_release]
    ON [dbo].[media_alternatetitle]([releaseid] ASC);

