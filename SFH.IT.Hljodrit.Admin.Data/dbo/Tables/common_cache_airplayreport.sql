CREATE TABLE [dbo].[common_cache_airplayreport] (
    [id]              INT            IDENTITY (1, 1) NOT NULL,
    [station]         NVARCHAR (50)  NOT NULL,
    [mucssno]         NVARCHAR (10)  NOT NULL,
    [mucname]         NVARCHAR (100) NOT NULL,
    [percinrecording] FLOAT (53)     NOT NULL,
    [totalperc]       FLOAT (53)     NOT NULL,
    [stationperc]     FLOAT (53)     NOT NULL,
    [playseconds]     FLOAT (53)     NOT NULL,
    [amount]          FLOAT (53)     NOT NULL,
    [year]            INT            NOT NULL,
    [username]        NVARCHAR (50)  NOT NULL,
    [recordingtitle]  NVARCHAR (200) NOT NULL,
    [isrc]            NVARCHAR (20)  NOT NULL,
    CONSTRAINT [PK_common_cache_airplayreport] PRIMARY KEY CLUSTERED ([id] ASC)
);

