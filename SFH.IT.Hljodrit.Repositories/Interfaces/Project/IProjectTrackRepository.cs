using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Project
{
    public interface IProjectTrackRepository : IRepository<project_track>
    {
        IEnumerable<SongWithPerformersDto> GetProjectTracksById(int projectId);
    }
}
