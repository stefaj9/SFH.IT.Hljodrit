CREATE TABLE [dbo].[party_artistdefaultroles] (
    [id]           INT            IDENTITY (1, 1) NOT NULL,
    [mainartistid] INT            NOT NULL,
    [rolecode]     NVARCHAR (5)   NOT NULL,
    [sortorder]    INT            NULL,
    [comment]      NVARCHAR (500) NULL,
    [updatedby]    NVARCHAR (50)  NOT NULL,
    [updatedon]    DATETIME       NOT NULL,
    [createdby]    NVARCHAR (50)  NOT NULL,
    [createdon]    DATETIME       NOT NULL,
    CONSTRAINT [PK_party_aliasdefaultrole] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_party_artistdefaultroles_party_mainartist] FOREIGN KEY ([mainartistid]) REFERENCES [dbo].[party_mainartist] ([id]),
    CONSTRAINT [FK_party_artistdefaultroles_party_partyroletype] FOREIGN KEY ([rolecode]) REFERENCES [dbo].[party_partyroletype] ([rolecode])
);

