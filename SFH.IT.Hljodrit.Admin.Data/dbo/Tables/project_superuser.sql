CREATE TABLE [dbo].[project_superuser] (
    [username]  NVARCHAR (50) NOT NULL,
    [updatedby] NVARCHAR (20) NOT NULL,
    [updatedon] DATETIME      NOT NULL,
    [createdby] NVARCHAR (20) NOT NULL,
    [createdon] DATETIME      NOT NULL,
    CONSTRAINT [PK_project_superuser] PRIMARY KEY CLUSTERED ([username] ASC)
);

