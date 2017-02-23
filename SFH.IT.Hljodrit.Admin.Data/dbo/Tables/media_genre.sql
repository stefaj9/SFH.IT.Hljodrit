CREATE TABLE [dbo].[media_genre] (
    [id]    INT           IDENTITY (1, 1) NOT NULL,
    [genre] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_media_genre] PRIMARY KEY CLUSTERED ([id] ASC)
);

