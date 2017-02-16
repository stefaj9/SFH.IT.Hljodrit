CREATE TABLE [dbo].[media_airplay] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [mediaproductid] INT           NOT NULL,
    [year]           INT           NOT NULL,
    [bylgjan]        INT           NULL,
    [lettbylgjan]    INT           NULL,
    [fm957]          INT           NULL,
    [xid977]         INT           NULL,
    [gull]           INT           NULL,
    [k100]           INT           NULL,
    [ras1]           INT           NULL,
    [ras2]           INT           NULL,
    [updatedby]      NVARCHAR (50) NOT NULL,
    [updatedon]      DATETIME      NOT NULL,
    CONSTRAINT [PK_media_airplay] PRIMARY KEY CLUSTERED ([mediaproductid] ASC),
    CONSTRAINT [FK_media_airplay_media_product] FOREIGN KEY ([mediaproductid]) REFERENCES [dbo].[media_product] ([id])
);

