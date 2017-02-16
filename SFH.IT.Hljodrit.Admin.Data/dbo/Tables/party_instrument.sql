CREATE TABLE [dbo].[party_instrument] (
    [id]               INT            IDENTITY (1, 1) NOT NULL,
    [partyrealid]      INT            NOT NULL,
    [instrumentcode]   NVARCHAR (5)   NOT NULL,
    [capabilityrating] INT            NULL,
    [comment]          NVARCHAR (500) NULL,
    [sortorder]        INT            NULL,
    [updatedby]        NVARCHAR (50)  NOT NULL,
    [updatedon]        DATETIME       NOT NULL,
    [createdby]        NVARCHAR (50)  NOT NULL,
    [createdon]        DATETIME       NOT NULL,
    CONSTRAINT [PK_party.instrument] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_party_instrument_instrumenttype] FOREIGN KEY ([instrumentcode]) REFERENCES [dbo].[party_instrumenttype] ([code]),
    CONSTRAINT [FK_party_instrument_party_real] FOREIGN KEY ([partyrealid]) REFERENCES [dbo].[party_real] ([id])
);

