CREATE TABLE [dbo].[organization_cataloguerights] (
    [id]                          INT            IDENTITY (1, 1) NOT NULL,
    [labelid]                     INT            NOT NULL,
    [organization_rightsholderid] INT            NOT NULL,
    [catalogueid]                 NVARCHAR (20)  NOT NULL,
    [datefrom]                    DATETIME       NULL,
    [dateto]                      DATETIME       NULL,
    [comments]                    NVARCHAR (500) NULL,
    [updatedby]                   NVARCHAR (50)  NOT NULL,
    [updatedon]                   DATETIME       NOT NULL,
    [createdby]                   NVARCHAR (50)  NOT NULL,
    [createdon]                   DATETIME       NOT NULL,
    CONSTRAINT [PK_organization_labelrights] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_organization_cataloguerights_organization_labels] FOREIGN KEY ([labelid]) REFERENCES [dbo].[organization_labels] ([id]),
    CONSTRAINT [FK_organization_cataloguerights_organization_master] FOREIGN KEY ([organization_rightsholderid]) REFERENCES [dbo].[organization_master] ([id])
);

