CREATE TABLE [dbo].[recording_party] (
    [id]                INT            IDENTITY (1, 1) NOT NULL,
    [recordingid]       INT            NOT NULL,
    [partyrealid]       INT            NOT NULL,
    [rolecode]          NVARCHAR (5)   NOT NULL,
    [instrumentcode]    NVARCHAR (5)   NULL,
    [artistpseudonymid] INT            NULL,
    [comment]           NVARCHAR (500) NULL,
    [updatedby]         NVARCHAR (20)  NOT NULL,
    [updatedon]         DATETIME       NOT NULL,
    [createdby]         NVARCHAR (20)  NOT NULL,
    [createdon]         DATETIME       NOT NULL,
    [status]            INT            NOT NULL,
    [verifiedby]        NVARCHAR (20)  NULL,
    [verifiedon]        DATETIME       NULL,
    CONSTRAINT [PK_recording_party] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_recording_party_media_recording] FOREIGN KEY ([recordingid]) REFERENCES [dbo].[media_recording] ([id]) ON DELETE CASCADE,
    CONSTRAINT [FK_recording_party_party_instrumenttype] FOREIGN KEY ([instrumentcode]) REFERENCES [dbo].[party_instrumenttype] ([code]),
    CONSTRAINT [FK_recording_party_party_partyroletype] FOREIGN KEY ([rolecode]) REFERENCES [dbo].[party_partyroletype] ([rolecode]),
    CONSTRAINT [FK_recording_party_party_pseudonym] FOREIGN KEY ([artistpseudonymid]) REFERENCES [dbo].[party_pseudonym] ([id]),
    CONSTRAINT [FK_recording_party_party_real] FOREIGN KEY ([partyrealid]) REFERENCES [dbo].[party_real] ([id]) ON DELETE CASCADE
);

