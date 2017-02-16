CREATE TABLE [dbo].[project_status] (
    [statuscode] NVARCHAR (10) NOT NULL,
    [statusname] NVARCHAR (50) NOT NULL,
    [sortorder]  INT           NOT NULL,
    CONSTRAINT [PK_project_status] PRIMARY KEY CLUSTERED ([statuscode] ASC)
);

