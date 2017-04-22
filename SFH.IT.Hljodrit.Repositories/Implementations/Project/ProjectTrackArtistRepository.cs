using System.Linq;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Project
{
    public class ProjectTrackArtistRepository : RepositoryBase<project_track_artist>, IProjectTrackArtistRepository
    {
        public ProjectTrackArtistRepository(IDbFactory dbFactory)
            : base(dbFactory) { }
    }
}
