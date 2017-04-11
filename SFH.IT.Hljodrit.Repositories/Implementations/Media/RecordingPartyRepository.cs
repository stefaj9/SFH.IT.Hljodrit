using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Media;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Media
{
    public class RecordingPartyRepository : RepositoryBase<recording_party>, IRecordingPartyRepository
    {
        public RecordingPartyRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
