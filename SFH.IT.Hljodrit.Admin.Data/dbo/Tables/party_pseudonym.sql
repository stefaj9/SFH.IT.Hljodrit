CREATE TABLE [dbo].[party_pseudonym] (
    [id]          INT            IDENTITY (1, 1) NOT NULL,
    [partyrealid] INT            NOT NULL,
    [orderid]     INT            NULL,
    [name]        NVARCHAR (100) NOT NULL,
    [details]     NTEXT          NULL,
    [updatedby]   NVARCHAR (20)  NOT NULL,
    [updatedon]   DATETIME       NOT NULL,
    [createdby]   NVARCHAR (20)  NOT NULL,
    [createdon]   DATETIME       NOT NULL,
    [externalid]  NVARCHAR (30)  NULL,
    CONSTRAINT [PK_people.alias] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_party_pseudonym_party_real] FOREIGN KEY ([partyrealid]) REFERENCES [dbo].[party_real] ([id])
);


GO
CREATE NONCLUSTERED INDEX [_dta_index_party_alias_14_2071678428__K1_3]
    ON [dbo].[party_pseudonym]([id] ASC)
    INCLUDE([name]);


GO
CREATE NONCLUSTERED INDEX [IX_UniqueIdentifier]
    ON [dbo].[party_pseudonym]([partyrealid] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_AliasName]
    ON [dbo].[party_pseudonym]([name] ASC);

