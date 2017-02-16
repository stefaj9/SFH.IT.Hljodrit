CREATE TABLE [dbo].[media_work] (
    [id]              INT            IDENTITY (1, 1) NOT NULL,
    [iswc]            NVARCHAR (20)  NULL,
    [title]           NVARCHAR (250) NULL,
    [issuedate]       DATETIME       NOT NULL,
    [countryoforigin] NVARCHAR (5)   NULL,
    [statusid]        INT            NULL,
    [updatedby]       NVARCHAR (50)  NOT NULL,
    [updatedon]       DATETIME       NOT NULL,
    [createdby]       NVARCHAR (50)  NOT NULL,
    [createdon]       DATETIME       NOT NULL,
    CONSTRAINT [PK_media.work] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [work_to_status] FOREIGN KEY ([statusid]) REFERENCES [dbo].[media_status] ([id])
);

