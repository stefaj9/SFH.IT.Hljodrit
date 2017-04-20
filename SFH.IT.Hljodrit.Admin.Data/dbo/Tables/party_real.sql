CREATE TABLE [dbo].[party_real] (
    [id]                 INT            IDENTITY (1, 1) NOT NULL,
    [uniqueidentifier]   NVARCHAR (30)  NULL,
    [firstname]          NVARCHAR (50)  NULL,
    [middlename]         NVARCHAR (50)  NULL,
    [lastname]           NVARCHAR (50)  NULL,
    [fullname]           NVARCHAR (200) NOT NULL,
    [postaladdressline1] NVARCHAR (100) NULL,
    [postaladdressline2] NVARCHAR (100) NULL,
    [zipcode]            NVARCHAR (12)  NULL,
    [area]               NVARCHAR (100) NULL,
    [city]               NVARCHAR (100) NULL,
    [countrycode]        NVARCHAR (5)   NULL,
    [updatedon]          DATETIME       NOT NULL,
    [dateofbirth]        DATETIME       NULL,
    [dateofdeath]        DATETIME       NULL,
    [website]            NVARCHAR (200) NULL,
    [deceased]           BIT            NULL,
    [importid]           INT            NULL,
    [isdeleted]          BIT            CONSTRAINT [DF_party_real_isdeleted] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_party.real] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_party_real_party_real] FOREIGN KEY ([id]) REFERENCES [dbo].[party_real] ([id])
);








GO
CREATE NONCLUSTERED INDEX [IX_FullName]
    ON [dbo].[party_real]([fullname] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_uniqueidentifier]
    ON [dbo].[party_real]([uniqueidentifier] ASC);

