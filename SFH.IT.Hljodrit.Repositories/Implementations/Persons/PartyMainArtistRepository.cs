using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Persons
{
    public class PartyMainArtistRepository : RepositoryBase<party_mainartist, HljodritEntitiesDb>, IPartyMainArtistRepository
    {
        public PartyMainArtistRepository(IDbFactory<HljodritEntitiesDb> dbFactory) : base(dbFactory)
        {
        }
    }
}
