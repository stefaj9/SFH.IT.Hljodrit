using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Instruments;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Instruments
{
    public class InstrumentRepository: RepositoryBase<party_instrumenttype, HljodritEntitiesDb>, IInstrumentRepository
    {
        public InstrumentRepository(IDbFactory<HljodritEntitiesDb> dbFactory)
            : base(dbFactory) { }
    }
}
