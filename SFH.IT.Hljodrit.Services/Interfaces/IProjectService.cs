﻿using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IProjectService
    {
        Envelope<ProjectDto> GetAllProjects(int pageSize, int pageNumber, bool pending, bool resent, bool approved, string query);
        bool MarkProjectAsDeleted(int projectId);
        ProjectExtendedDto GetProjectById(int projectId);
        IEnumerable<SongWithPerformersDto> GetProjectTracksById(int projectId);
    }
}
