CREATE TABLE [dbo].[party_mainartist] (
    [id]                    INT            IDENTITY (1, 1) NOT NULL,
    [artistname]            NVARCHAR (200) NOT NULL,
    [partyrealid]           INT            NULL,
    [artisttypecode]        NVARCHAR (5)   NULL,
    [peformancetype]        NVARCHAR (5)   NULL,
    [genre]                 NVARCHAR (20)  NULL,
    [maincontactid]         INT            NULL,
    [website]               NVARCHAR (200) NULL,
    [imagepath]             NVARCHAR (200) NULL,
    [startdate]             DATETIME       NULL,
    [enddate]               DATETIME       NULL,
    [artistnationalitycode] INT            NULL,
    [details]               NTEXT          NULL,
    [externalid]            NVARCHAR (30)  NULL,
    [updatedby]             NVARCHAR (20)  NOT NULL,
    [updatedon]             DATETIME       NOT NULL,
    [createdby]             NVARCHAR (20)  NOT NULL,
    [createdon]             DATETIME       NOT NULL,
    [stefnumber]            NVARCHAR (50)  NULL,
    [groupsize]             INT            NULL,
    CONSTRAINT [PK_party_mainartist] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_mainartist_maincontact] FOREIGN KEY ([maincontactid]) REFERENCES [dbo].[party_real] ([id]),
    CONSTRAINT [FK_party_mainartist_common_country] FOREIGN KEY ([artistnationalitycode]) REFERENCES [dbo].[common_country] ([numericisocode]),
    CONSTRAINT [FK_party_mainartist_party_artisttype] FOREIGN KEY ([artisttypecode]) REFERENCES [dbo].[party_artisttype] ([code]),
    CONSTRAINT [FK_party_mainartist_party_real] FOREIGN KEY ([partyrealid]) REFERENCES [dbo].[party_real] ([id])
);


GO
CREATE NONCLUSTERED INDEX [IX_party_mainartist]
    ON [dbo].[party_mainartist]([artistname] ASC);

