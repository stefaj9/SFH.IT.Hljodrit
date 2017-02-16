CREATE TABLE [dbo].[project_user] (
    [id]            INT              IDENTITY (1, 1) NOT NULL,
    [projectid]     INT              NOT NULL,
    [email]         NVARCHAR (50)    NOT NULL,
    [fullname]      NVARCHAR (100)   NULL,
    [guid]          UNIQUEIDENTIFIER NOT NULL,
    [admin]         BIT              NOT NULL,
    [username]      NVARCHAR (50)    NULL,
    [activated]     BIT              NOT NULL,
    [invitedbyuser] NVARCHAR (50)    NOT NULL,
    CONSTRAINT [PK_project_user_1] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_project_user_project_master] FOREIGN KEY ([projectid]) REFERENCES [dbo].[project_master] ([id]) ON DELETE CASCADE
);

