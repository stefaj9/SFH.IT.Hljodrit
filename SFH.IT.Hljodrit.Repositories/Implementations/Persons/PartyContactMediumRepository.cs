using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Persons
{
    public class PartyContactMediumRepository : RepositoryBase<party_contactmedium, HljodritEntitiesDb>, IPartyContactMediumRepository
    {
        public PartyContactMediumRepository(IDbFactory<HljodritEntitiesDb> dbFactory) : base(dbFactory)
        {
        }
    }
}
