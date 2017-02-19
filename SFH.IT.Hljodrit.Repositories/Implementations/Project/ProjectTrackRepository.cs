using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Project
{
    public class ProjectTrackRepository : RepositoryBase<project_track>, IProjectTrackRepository
    {
        public ProjectTrackRepository(IDbFactory dbFactory)
            : base(dbFactory) { }
    }
}
