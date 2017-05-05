using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Persons
{
    public class PartyRoleRepository : RepositoryBase<party_partyroletype, HljodritEntitiesDb>, IPartyRoleRepository
    {
        public PartyRoleRepository(IDbFactory<HljodritEntitiesDb> dbFactory) : base(dbFactory)
        {
        }
    }
}
