CREATE TABLE [dbo].[media_status] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [statusname]     NVARCHAR (50) NULL,
    [ownerisvisible] BIT           NULL,
    CONSTRAINT [PK_media.status] PRIMARY KEY CLUSTERED ([id] ASC)
);

