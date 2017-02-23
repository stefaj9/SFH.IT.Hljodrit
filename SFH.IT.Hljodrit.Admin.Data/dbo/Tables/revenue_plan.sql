CREATE TABLE [dbo].[revenue_plan] (
    [id]                 INT           IDENTITY (1, 1) NOT NULL,
    [name]               NVARCHAR (50) NOT NULL,
    [revenuunits]        INT           NULL,
    [defaultrevenueplan] BIT           NULL,
    [status]             INT           NULL,
    [updatedby]          NVARCHAR (50) NOT NULL,
    [updatedon]          DATETIME      NOT NULL,
    [createdby]          NVARCHAR (50) NOT NULL,
    [createdon]          DATETIME      NOT NULL,
    CONSTRAINT [PK_revenue.plan] PRIMARY KEY CLUSTERED ([id] ASC)
);

