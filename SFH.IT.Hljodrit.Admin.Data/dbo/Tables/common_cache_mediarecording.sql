﻿CREATE TABLE [dbo].[common_cache_mediarecording] (
    [id]             INT            IDENTITY (1, 1) NOT NULL,
    [cacheGroupName] NVARCHAR (200) NOT NULL,
    [username]       NVARCHAR (20)  NOT NULL,
    [updatedby]      NVARCHAR (20)  NOT NULL,
    [updatedon]      DATETIME       NOT NULL,
    [createdby]      NVARCHAR (20)  NOT NULL,
    [createdon]      DATETIME       NOT NULL,
    CONSTRAINT [PK_common_cache_media_recording] PRIMARY KEY CLUSTERED ([id] ASC)
);

