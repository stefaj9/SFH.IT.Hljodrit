CREATE TABLE [dbo].[media_source] (
    [id]             INT             IDENTITY (1, 1) NOT NULL,
    [isrc]           NVARCHAR (20)   NULL,
    [recordingid]    INT             NOT NULL,
    [formattypeid]   NVARCHAR (5)    NULL,
    [sourcebitrate]  INT             NULL,
    [sourcesizeinkb] DECIMAL (18, 2) NULL,
    [duration]       TIME (7)        NULL,
    [sourcelocation] NVARCHAR (200)  NULL,
    [updatedby]      NVARCHAR (50)   NOT NULL,
    [updatedon]      DATETIME        NOT NULL,
    [createdby]      NVARCHAR (50)   NOT NULL,
    [createdon]      DATETIME        NOT NULL,
    CONSTRAINT [PK_media.source] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [source_to_recording] FOREIGN KEY ([recordingid]) REFERENCES [dbo].[media_recording] ([id]) ON DELETE CASCADE,
    CONSTRAINT [source_type] FOREIGN KEY ([formattypeid]) REFERENCES [dbo].[media_formattype] ([typeid])
);

