CREATE TABLE [dbo].[party_artistgroupmember] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [artistgroupid]  INT           NOT NULL,
    [artistid]       INT           NOT NULL,
    [partyrolecode]  NVARCHAR (5)  NULL,
    [instrumentcode] NVARCHAR (5)  NULL,
    [active]         BIT           NULL,
    [updatedby]      NVARCHAR (50) NOT NULL,
    [updatedon]      DATETIME      NOT NULL,
    [createdby]      NVARCHAR (50) NOT NULL,
    [createdon]      DATETIME      NOT NULL,
    CONSTRAINT [PK_party_aliasgroupmember] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_party_artistgroupmember_party_instrumenttype] FOREIGN KEY ([instrumentcode]) REFERENCES [dbo].[party_instrumenttype] ([code]),
    CONSTRAINT [FK_party_artistgroupmember_party_mainartist] FOREIGN KEY ([artistid]) REFERENCES [dbo].[party_mainartist] ([id]),
    CONSTRAINT [FK_party_artistgroupmember_party_partyroletype] FOREIGN KEY ([partyrolecode]) REFERENCES [dbo].[party_partyroletype] ([rolecode])
);

