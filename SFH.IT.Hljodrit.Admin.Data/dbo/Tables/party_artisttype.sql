CREATE TABLE [dbo].[party_artisttype] (
    [code]                  NVARCHAR (5)  NOT NULL,
    [mainartisttypename_is] NVARCHAR (50) NOT NULL,
    [mainartisttypename_en] NVARCHAR (50) NULL,
    [isoneperson]           BIT           NOT NULL,
    CONSTRAINT [PK_party_artisttype] PRIMARY KEY CLUSTERED ([code] ASC)
);

