using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Persons
{
    public class PartyRoleRepository : RepositoryBase<party_partyroletype, HljodritEntities>, IPartyRoleRepository
    {
        public PartyRoleRepository(IDbFactory<HljodritEntities> dbFactory) : base(dbFactory)
        {
        }
    }
}
