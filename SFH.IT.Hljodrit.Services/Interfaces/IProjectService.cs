using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IProjectService
    {
        Envelope<ProjectDto> GetAllProjects(int pageSize, int pageNumber, bool inWorkingState, bool recordingFinished, bool readyForPublish, bool published, string query);
        bool MarkProjectAsDeleted(int projectId);
        ProjectExtendedDto GetProjectById(int projectId);
        IEnumerable<SongWithPerformersDto> GetProjectTracksById(int projectId);
        int PublishProjectById(int projectId, ProjectReviewViewModel reviewModel);
        IEnumerable<ProjectStatusDto> GetProjectStatus();
        void CreateProject(ProjectCreationViewModel project, string userName);
        IEnumerable<ProjectDto> GetProjectsByUsername(string userName);
    }
}
