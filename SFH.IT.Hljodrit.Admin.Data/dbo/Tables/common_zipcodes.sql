CREATE TABLE [dbo].[common_zipcodes] (
    [zipcode]  NVARCHAR (12)  NOT NULL,
    [areaname] NVARCHAR (100) NOT NULL,
    CONSTRAINT [PK_common_zipcodes] PRIMARY KEY CLUSTERED ([zipcode] ASC)
);

