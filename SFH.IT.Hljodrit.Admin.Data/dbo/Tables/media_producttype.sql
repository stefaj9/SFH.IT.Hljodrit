CREATE TABLE [dbo].[media_producttype] (
    [id]           INT            IDENTITY (1, 1) NOT NULL,
    [fulltypename] NVARCHAR (100) NULL,
    [comment]      VARCHAR (250)  NULL,
    CONSTRAINT [PK_media.type] PRIMARY KEY CLUSTERED ([id] ASC)
);

