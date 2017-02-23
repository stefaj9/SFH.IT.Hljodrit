CREATE TABLE [dbo].[common_airplay_attributes] (
    [year]         INT             NOT NULL,
    [Ras1Ras2]     DECIMAL (18, 2) NOT NULL,
    [Bylgjan]      DECIMAL (18, 2) NOT NULL,
    [GullOgXid]    DECIMAL (18, 2) NOT NULL,
    [Lettbylgjan]  DECIMAL (18, 2) NOT NULL,
    [FM957]        DECIMAL (18, 2) NOT NULL,
    [K100]         DECIMAL (18, 2) NOT NULL,
    [AmountIssued] DECIMAL (18, 2) NOT NULL,
    CONSTRAINT [PK_common_airplay_attributes] PRIMARY KEY CLUSTERED ([year] ASC)
);

