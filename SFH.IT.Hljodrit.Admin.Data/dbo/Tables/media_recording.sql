CREATE TABLE [dbo].[media_recording] (
    [id]                   INT            IDENTITY (1, 1) NOT NULL,
    [isrc]                 NVARCHAR (20)  NULL,
    [iswc]                 NVARCHAR (20)  NULL,
    [workid]               INT            NULL,
    [recordingtitle]       NVARCHAR (200) NOT NULL,
    [workingtitle]         NVARCHAR (200) NULL,
    [recordingcountrycode] INT            NULL,
    [statusid]             INT            NULL,
    [trackkey]             NVARCHAR (50)  NULL,
    [comment]              NVARCHAR (250) NULL,
    [updatedby]            NVARCHAR (20)  NOT NULL,
    [updatedon]            DATETIME       NOT NULL,
    [createdby]            NVARCHAR (20)  NOT NULL,
    [createdon]            DATETIME       NOT NULL,
    [recordingdate]        DATETIME       NULL,
    [duration]             TIME (7)       NULL,
    [mainartist]           INT            NULL,
    [markedfordeletion]    BIT            NOT NULL,
    [projecttrackid]       INT            NULL,
    CONSTRAINT [PK_music.trackpublication] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_media_recording_common_country] FOREIGN KEY ([recordingcountrycode]) REFERENCES [dbo].[common_country] ([numericisocode]),
    CONSTRAINT [FK_media_recording_mainartist] FOREIGN KEY ([mainartist]) REFERENCES [dbo].[party_mainartist] ([id]) ON DELETE SET NULL,
    CONSTRAINT [recording_status] FOREIGN KEY ([statusid]) REFERENCES [dbo].[media_status] ([id]),
    CONSTRAINT [Recording_Work] FOREIGN KEY ([workid]) REFERENCES [dbo].[media_work] ([id]) ON DELETE SET NULL
);


GO
ALTER TABLE [dbo].[media_recording] NOCHECK CONSTRAINT [FK_media_recording_mainartist];


GO
CREATE NONCLUSTERED INDEX [_dta_index_media_recording_14_807673925__K1_K15_K17_K8_2_5]
    ON [dbo].[media_recording]([id] ASC, [recordingdate] ASC, [mainartist] ASC, [statusid] ASC)
    INCLUDE([isrc], [recordingtitle]);


GO
CREATE NONCLUSTERED INDEX [_dta_index_media_recording_14_807673925__K9_1_2_3_4_5_6_7_8_10_11_12_13_14_15_16]
    ON [dbo].[media_recording]([trackkey] ASC)
    INCLUDE([id], [isrc], [iswc], [workid], [recordingtitle], [workingtitle], [recordingcountrycode], [statusid], [comment], [updatedby], [updatedon], [createdby], [createdon], [recordingdate], [duration]);


GO
CREATE NONCLUSTERED INDEX [IX_media_recording]
    ON [dbo].[media_recording]([recordingtitle] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_media_recording_1]
    ON [dbo].[media_recording]([isrc] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_media_recording_2]
    ON [dbo].[media_recording]([recordingdate] ASC);

