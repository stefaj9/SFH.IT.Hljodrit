﻿using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Persons
{
    public class PartyContactMediumRepository : RepositoryBase<party_contactmedium>, IPartyContactMediumRepository
    {
        public PartyContactMediumRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}