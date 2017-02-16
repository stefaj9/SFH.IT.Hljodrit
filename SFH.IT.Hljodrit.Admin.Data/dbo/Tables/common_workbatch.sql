CREATE TABLE [dbo].[common_workbatch] (
    [username]    NVARCHAR (50) NOT NULL,
    [recordingid] INT           NOT NULL,
    [id]          INT           IDENTITY (1, 1) NOT NULL,
    [trackorder]  INT           NOT NULL,
    CONSTRAINT [PK_common_workbatch] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_common_workbatch_media_recording] FOREIGN KEY ([recordingid]) REFERENCES [dbo].[media_recording] ([id]) ON DELETE CASCADE
);

