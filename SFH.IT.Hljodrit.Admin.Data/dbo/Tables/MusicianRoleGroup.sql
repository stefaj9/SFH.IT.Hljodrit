CREATE TABLE [dbo].[MusicianRoleGroup] (
    [ID]          INT            IDENTITY (1, 1) NOT NULL,
    [Points]      INT            NOT NULL,
    [Description] NVARCHAR (MAX) CONSTRAINT [DF_MusicianRoleGroup_Description] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_MusicianRoleGroup] PRIMARY KEY CLUSTERED ([ID] ASC)
);

