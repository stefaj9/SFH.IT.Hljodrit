CREATE TABLE [dbo].[party_partyroletype] (
    [rolecode]            NVARCHAR (5)  NOT NULL,
    [rolename_en]         NVARCHAR (50) NULL,
    [rolename_is]         NVARCHAR (50) NOT NULL,
    [revenuplanid]        INT           NULL,
    [active]              BIT           NULL,
    [sortorder]           INT           NULL,
    [equivalent_role]     NVARCHAR (5)  NULL,
    [adminonly]           BIT           NOT NULL,
    [MusicianRoleGroupId] INT           CONSTRAINT [DF_party_partyroletype_MusicianRoleGroupId] DEFAULT ((8)) NOT NULL,
    CONSTRAINT [PK_artist.recordingroletype] PRIMARY KEY CLUSTERED ([rolecode] ASC),
    CONSTRAINT [FK_party_partyroletype_MusicianRoleGroup] FOREIGN KEY ([MusicianRoleGroupId]) REFERENCES [dbo].[MusicianRoleGroup] ([ID])
);



