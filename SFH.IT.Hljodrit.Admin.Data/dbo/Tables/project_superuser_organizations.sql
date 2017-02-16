CREATE TABLE [dbo].[project_superuser_organizations] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [username]       NVARCHAR (50) NOT NULL,
    [organizationid] INT           NOT NULL,
    CONSTRAINT [PK_project_superuser_organizations] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_project_superuser_organizations_organization_master] FOREIGN KEY ([organizationid]) REFERENCES [dbo].[organization_master] ([id]),
    CONSTRAINT [FK_project_superuser_organizations_project_superuser] FOREIGN KEY ([username]) REFERENCES [dbo].[project_superuser] ([username])
);

