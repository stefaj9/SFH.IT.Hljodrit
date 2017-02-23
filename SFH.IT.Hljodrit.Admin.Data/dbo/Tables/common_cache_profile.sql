CREATE TABLE [dbo].[common_cache_profile] (
    [username]              NVARCHAR (50) NOT NULL,
    [lastCacheGroupIDInUse] INT           NULL,
    [lastCaceMediaInUse]    INT           NULL,
    CONSTRAINT [PK_common_cache_profile] PRIMARY KEY CLUSTERED ([username] ASC)
);

