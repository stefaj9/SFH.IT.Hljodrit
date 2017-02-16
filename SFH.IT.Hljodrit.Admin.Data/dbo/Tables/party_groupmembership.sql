CREATE TABLE [dbo].[party_groupmembership] (
    [id]              INT           IDENTITY (1, 1) NOT NULL,
    [partyrealid]     INT           NULL,
    [mainartistid]    INT           NOT NULL,
    [validmember]     BIT           NULL,
    [validmemberfrom] DATETIME      NULL,
    [updatedby]       NVARCHAR (20) NOT NULL,
    [updatedon]       DATETIME      NOT NULL,
    [createdby]       NVARCHAR (20) NOT NULL,
    [createdon]       DATETIME      NOT NULL,
    CONSTRAINT [PK_party.groupmembership] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [membership_group] FOREIGN KEY ([mainartistid]) REFERENCES [dbo].[party_mainartist] ([id])
);

