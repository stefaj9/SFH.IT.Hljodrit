CREATE TABLE [dbo].[party_address] (
    [id]          INT            IDENTITY (1, 1) NOT NULL,
    [partyid]     INT            NULL,
    [street1]     NVARCHAR (100) NULL,
    [street2]     NVARCHAR (100) NULL,
    [postalbox]   NVARCHAR (15)  NULL,
    [floor]       NVARCHAR (15)  NULL,
    [zipcode]     INT            NULL,
    [state]       NVARCHAR (100) NULL,
    [city]        NVARCHAR (100) NULL,
    [countrycode] NVARCHAR (5)   NULL,
    [updatedby]   NVARCHAR (20)  NOT NULL,
    [updatedon]   DATETIME       NOT NULL,
    [createdby]   NVARCHAR (20)  NOT NULL,
    [createdon]   DATETIME       NOT NULL,
    CONSTRAINT [PK_party.address] PRIMARY KEY CLUSTERED ([id] ASC)
);

