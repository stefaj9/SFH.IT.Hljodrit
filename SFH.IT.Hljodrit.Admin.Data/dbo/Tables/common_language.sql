CREATE TABLE [dbo].[common_language] (
    [LanguageId]      INT            IDENTITY (1, 1) NOT NULL,
    [Name]            NVARCHAR (100) NOT NULL,
    [LanguageCulture] VARCHAR (20)   NOT NULL,
    [Published]       BIT            NOT NULL,
    [DisplayOrder]    INT            NOT NULL,
    CONSTRAINT [Common_language_PK] PRIMARY KEY CLUSTERED ([LanguageId] ASC) WITH (FILLFACTOR = 80)
);


GO
CREATE NONCLUSTERED INDEX [IX_Common_language_DisplayOrder]
    ON [dbo].[common_language]([DisplayOrder] ASC) WITH (FILLFACTOR = 80);

