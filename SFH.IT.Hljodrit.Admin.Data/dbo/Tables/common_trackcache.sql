CREATE TABLE [dbo].[common_trackcache] (
    [autoid]             INT            NOT NULL,
    [username]           NVARCHAR (50)  NOT NULL,
    [id]                 INT            NOT NULL,
    [title]              NVARCHAR (200) NULL,
    [isrc]               NVARCHAR (20)  NULL,
    [duration]           TIME (7)       NULL,
    [recordingdate]      DATETIME       NULL,
    [mainartist]         NVARCHAR (100) NULL,
    [mainartistuniqueid] NVARCHAR (30)  NULL,
    [rolesexist]         BIT            NULL,
    CONSTRAINT [PK_common_trackcache] PRIMARY KEY CLUSTERED ([autoid] ASC)
);

