CREATE TABLE [dbo].[common_cache_recordingparty_detail] (
    [id]                 INT          IDENTITY (1, 1) NOT NULL,
    [groupid]            INT          NOT NULL,
    [partyartistgroupid] INT          NULL,
    [partyrealid]        INT          NOT NULL,
    [rolecode]           NVARCHAR (5) NULL,
    [instrumentcode]     NVARCHAR (5) NULL,
    [artistpseudonymid]  INT          NULL,
    CONSTRAINT [PK_common_CacheRecordingParty_Detail] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_common_cache_mainartist] FOREIGN KEY ([partyartistgroupid]) REFERENCES [dbo].[party_mainartist] ([id]) NOT FOR REPLICATION,
    CONSTRAINT [FK_common_cache_recordingparty_detail_common_cache_recordingparty] FOREIGN KEY ([groupid]) REFERENCES [dbo].[common_cache_recordingparty] ([id]) ON DELETE CASCADE,
    CONSTRAINT [FK_common_cache_recordingparty_detail_party_instrumenttype] FOREIGN KEY ([instrumentcode]) REFERENCES [dbo].[party_instrumenttype] ([code]) NOT FOR REPLICATION,
    CONSTRAINT [FK_common_cache_recordingparty_detail_party_partyroletype] FOREIGN KEY ([rolecode]) REFERENCES [dbo].[party_partyroletype] ([rolecode]) NOT FOR REPLICATION,
    CONSTRAINT [FK_common_cache_recordingparty_detail_party_pseudonym] FOREIGN KEY ([artistpseudonymid]) REFERENCES [dbo].[party_pseudonym] ([id]),
    CONSTRAINT [FK_common_cache_recordingparty_detail_party_real] FOREIGN KEY ([partyrealid]) REFERENCES [dbo].[party_real] ([id])
);


GO
ALTER TABLE [dbo].[common_cache_recordingparty_detail] NOCHECK CONSTRAINT [FK_common_cache_mainartist];


GO
ALTER TABLE [dbo].[common_cache_recordingparty_detail] NOCHECK CONSTRAINT [FK_common_cache_recordingparty_detail_party_instrumenttype];


GO
ALTER TABLE [dbo].[common_cache_recordingparty_detail] NOCHECK CONSTRAINT [FK_common_cache_recordingparty_detail_party_partyroletype];

