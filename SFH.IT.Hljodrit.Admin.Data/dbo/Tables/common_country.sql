CREATE TABLE [dbo].[common_country] (
    [numericisocode]     INT            NOT NULL,
    [name_en]            NVARCHAR (100) NOT NULL,
    [name_is]            NVARCHAR (100) NULL,
    [allowsregistration] BIT            NOT NULL,
    [allowsbilling]      BIT            NOT NULL,
    [allowsshipping]     BIT            NOT NULL,
    [twoletterisocode]   NVARCHAR (2)   NOT NULL,
    [threeletterisocode] NVARCHAR (3)   NOT NULL,
    [published]          BIT            CONSTRAINT [DF_Common_country_Published] DEFAULT ((1)) NOT NULL,
    [displayorder]       INT            CONSTRAINT [DF_Common_country_DisplayOrder] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_common_country_1] PRIMARY KEY CLUSTERED ([numericisocode] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_Common_country_DisplayOrder]
    ON [dbo].[common_country]([displayorder] ASC) WITH (FILLFACTOR = 80);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_common_twoletter]
    ON [dbo].[common_country]([twoletterisocode] ASC);

