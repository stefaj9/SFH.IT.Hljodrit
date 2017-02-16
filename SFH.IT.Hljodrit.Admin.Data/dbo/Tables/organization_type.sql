CREATE TABLE [dbo].[organization_type] (
    [id]          INT            IDENTITY (1, 1) NOT NULL,
    [typename_is] NVARCHAR (100) NOT NULL,
    [typename_en] NVARCHAR (100) NOT NULL,
    [subtype]     INT            NULL,
    CONSTRAINT [PK_organization_type] PRIMARY KEY CLUSTERED ([id] ASC)
);

