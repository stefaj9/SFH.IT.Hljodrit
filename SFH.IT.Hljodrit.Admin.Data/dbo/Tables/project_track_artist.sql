CREATE TABLE [dbo].[project_track_artist] (
    [id]                INT            IDENTITY (1, 1) NOT NULL,
    [projecttrackid]    INT            NOT NULL,
    [partyrealid]       INT            NOT NULL,
    [rolecode]          NVARCHAR (5)   NOT NULL,
    [instrumentcode]    NVARCHAR (5)   NULL,
    [artistpseudonymid] INT            NULL,
    [comment]           NVARCHAR (500) NULL,
    [updatedby]         NVARCHAR (20)  NOT NULL,
    [updatedon]         DATETIME       NOT NULL,
    [createdby]         NVARCHAR (20)  NOT NULL,
    [createdon]         DATETIME       NOT NULL,
    CONSTRAINT [PK_project_track_artist] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_project_track_artist_party_instrumenttype] FOREIGN KEY ([instrumentcode]) REFERENCES [dbo].[party_instrumenttype] ([code]),
    CONSTRAINT [FK_project_track_artist_party_partyroletype] FOREIGN KEY ([rolecode]) REFERENCES [dbo].[party_partyroletype] ([rolecode]),
    CONSTRAINT [FK_project_track_artist_party_pseudonym] FOREIGN KEY ([artistpseudonymid]) REFERENCES [dbo].[party_pseudonym] ([id]) NOT FOR REPLICATION,
    CONSTRAINT [FK_project_track_artist_party_real] FOREIGN KEY ([partyrealid]) REFERENCES [dbo].[party_real] ([id]) ON DELETE CASCADE,
    CONSTRAINT [FK_project_track_artist_project_track] FOREIGN KEY ([projecttrackid]) REFERENCES [dbo].[project_track] ([id]) ON DELETE CASCADE
);


GO
ALTER TABLE [dbo].[project_track_artist] NOCHECK CONSTRAINT [FK_project_track_artist_party_pseudonym];

