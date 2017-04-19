CREATE TABLE [dbo].[project_master] (
    [id]               INT             IDENTITY (1, 1) NOT NULL,
    [projectname]      NVARCHAR (100)  NOT NULL,
    [mainmanagerid]    INT             NULL,
    [projectstartdate] DATETIME        NOT NULL,
    [projectenddate]   DATETIME        NULL,
    [isworkingtitle]   BIT             NOT NULL,
    [comment]          NVARCHAR (500)  NULL,
    [updatedby]        NVARCHAR (20)   NOT NULL,
    [updatedon]        DATETIME        NOT NULL,
    [createdby]        NVARCHAR (20)   NOT NULL,
    [createdon]        DATETIME        NOT NULL,
    [statuscode]       NVARCHAR (10)   NOT NULL,
    [removed]          BIT             CONSTRAINT [DF_project_master_removed] DEFAULT ((0)) NOT NULL,
    [reviewedby]       NVARCHAR (20)   NULL,
    [reviewedon]       DATETIME        NULL,
    [reviewedcomment]  NVARCHAR (1000) NULL,
    [reviewedok]       BIT             NULL,
    [organizationid]   INT             NULL,
    [mainartist]       NVARCHAR (200)  NULL,
    [mainartistid]     INT             NULL,
    CONSTRAINT [PK_project_master] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_project_master_mainartist] FOREIGN KEY ([mainartistid]) REFERENCES [dbo].[party_mainartist] ([id]),
    CONSTRAINT [FK_project_master_organization_master] FOREIGN KEY ([organizationid]) REFERENCES [dbo].[organization_master] ([id]),
    CONSTRAINT [FK_project_master_partyReal] FOREIGN KEY ([mainmanagerid]) REFERENCES [dbo].[party_real] ([id]),
    CONSTRAINT [FK_project_master_statur] FOREIGN KEY ([statuscode]) REFERENCES [dbo].[project_status] ([statuscode])
);



