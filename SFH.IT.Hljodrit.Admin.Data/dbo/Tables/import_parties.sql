CREATE TABLE [dbo].[import_parties] (
    [ssno]     NVARCHAR (10)  NULL,
    [importid] INT            NOT NULL,
    [name]     NVARCHAR (100) NULL,
    [address]  NVARCHAR (100) NULL,
    [zipcode]  NVARCHAR (100) NULL,
    [city]     NVARCHAR (100) NULL,
    [country]  NVARCHAR (100) NULL,
    CONSTRAINT [PK_import_parties] PRIMARY KEY CLUSTERED ([importid] ASC)
);

