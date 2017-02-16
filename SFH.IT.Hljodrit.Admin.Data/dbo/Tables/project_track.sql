CREATE TABLE [dbo].[project_track] (
    [id]                  INT            IDENTITY (1, 1) NOT NULL,
    [projectid]           INT            NOT NULL,
    [trackname]           NVARCHAR (100) NOT NULL,
    [isworkingtitle]      BIT            NOT NULL,
    [comment]             NVARCHAR (500) NULL,
    [updatedby]           NVARCHAR (20)  NOT NULL,
    [updatedon]           DATETIME       NOT NULL,
    [createdby]           NVARCHAR (20)  NOT NULL,
    [createdon]           DATETIME       NOT NULL,
    [isrc]                NVARCHAR (20)  NULL,
    [duration]            TIME (7)       NULL,
    [authorexceptioncode] INT            NULL,
    [donotpublish]        BIT            NOT NULL,
    [trackorder]          INT            NOT NULL,
    CONSTRAINT [PK_project_track] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_project_track_project_master] FOREIGN KEY ([projectid]) REFERENCES [dbo].[project_master] ([id]) ON DELETE CASCADE
);

