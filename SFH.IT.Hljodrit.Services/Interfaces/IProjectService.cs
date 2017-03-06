using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IProjectService
    {
        ProjectEnvelope GetAllProjects(int pageSize, int pageNumber, bool pending, bool resent, bool approved, string query);
    }
}
