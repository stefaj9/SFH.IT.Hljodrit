CREATE TABLE [dbo].[party_contactmedium] (
    [partyrealid]      INT            NOT NULL,
    [uniqueidentifier] NVARCHAR (30)  NULL,
    [homephone]        NVARCHAR (30)  NULL,
    [workphone]        NVARCHAR (30)  NULL,
    [mobilephone]      NVARCHAR (30)  NULL,
    [fax]              NVARCHAR (30)  NULL,
    [emailaddress]     NVARCHAR (50)  NULL,
    [skypeid]          NVARCHAR (50)  NULL,
    [msnid]            NVARCHAR (100) NULL,
    [preferredmedium]  INT            NULL,
    [updatedby]        NVARCHAR (20)  NOT NULL,
    [updatedon]        DATETIME       NOT NULL,
    [createdby]        NVARCHAR (20)  NOT NULL,
    [createdon]        DATETIME       NOT NULL,
    CONSTRAINT [PK_party_contactmedium] PRIMARY KEY CLUSTERED ([partyrealid] ASC),
    CONSTRAINT [FK_party_contactmedium_party_real] FOREIGN KEY ([partyrealid]) REFERENCES [dbo].[party_real] ([id])
);

