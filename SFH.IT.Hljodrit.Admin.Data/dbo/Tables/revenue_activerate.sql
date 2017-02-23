CREATE TABLE [dbo].[revenue_activerate] (
    [id]             INT             IDENTITY (1, 1) NOT NULL,
    [revenueplanid]  INT             NOT NULL,
    [revenueperunit] DECIMAL (16, 2) NOT NULL,
    [vat]            DECIMAL (16, 2) NULL,
    [validfrom]      DATETIME        NOT NULL,
    [validuntil]     DATETIME        NULL,
    [updatedby]      NVARCHAR (50)   NOT NULL,
    [updatedon]      DATETIME        NOT NULL,
    [createdby]      NVARCHAR (50)   NOT NULL,
    [createdon]      DATETIME        NOT NULL,
    CONSTRAINT [PK_revenue.activerate] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [activerate_revenyplan] FOREIGN KEY ([revenueplanid]) REFERENCES [dbo].[revenue_plan] ([id]) ON DELETE CASCADE
);

