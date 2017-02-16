CREATE TABLE [dbo].[common_cache_mediarecording_detail] (
    [id]          INT IDENTITY (1, 1) NOT NULL,
    [groupid]     INT NOT NULL,
    [recordingid] INT NOT NULL,
    CONSTRAINT [PK_common_cache_media_recording_detail] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_common_cache_mediarecording_detail_common_cache_mediarecording] FOREIGN KEY ([groupid]) REFERENCES [dbo].[common_cache_mediarecording] ([id]) ON DELETE CASCADE,
    CONSTRAINT [FK_common_cache_mediarecording_detail_media_recording] FOREIGN KEY ([recordingid]) REFERENCES [dbo].[media_recording] ([id]) ON DELETE CASCADE
);

