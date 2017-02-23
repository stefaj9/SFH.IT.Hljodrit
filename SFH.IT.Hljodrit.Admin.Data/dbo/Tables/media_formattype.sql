CREATE TABLE [dbo].[media_formattype] (
    [typeid]         NVARCHAR (5)  NOT NULL,
    [sourcetypename] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_media.sourcetype] PRIMARY KEY CLUSTERED ([typeid] ASC)
);

