CREATE TABLE [dbo].[organization_cataloguerights_backup] (
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
    [createdon]                   DATETIME       NOT NULL
);

