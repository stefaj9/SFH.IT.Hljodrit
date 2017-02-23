CREATE TABLE [dbo].[party_instrumenttype] (
    [code]           NVARCHAR (5)   NOT NULL,
    [parentcode]     NVARCHAR (5)   NULL,
    [name_en]        NVARCHAR (100) NOT NULL,
    [name_is]        NVARCHAR (100) NULL,
    [description_is] NVARCHAR (500) NULL,
    [description_en] NVARCHAR (500) NULL,
    [active]         BIT            NOT NULL,
    [imageavailable] BIT            NOT NULL,
    [updatedby]      NVARCHAR (50)  NULL,
    [updatedon]      DATETIME       NULL,
    [createdby]      NVARCHAR (50)  NULL,
    [createdon]      DATETIME       NULL,
    CONSTRAINT [PK_party_instrumenttype] PRIMARY KEY CLUSTERED ([code] ASC),
    CONSTRAINT [FK_party_instrumenttype_party_instrumenttype] FOREIGN KEY ([code]) REFERENCES [dbo].[party_instrumenttype] ([code])
);

