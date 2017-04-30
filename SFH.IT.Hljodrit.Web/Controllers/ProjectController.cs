using System.Linq;
using System.Web.Http;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;
using SFH.IT.Hljodrit.Web.Exceptions;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/projects")]
    public class ProjectController : ApiController
    {
        private readonly IProjectService _projectService;
        private const int MaxNumberOfTracks = 100;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        [Route("{projectId:int}")]
        public IHttpActionResult GetProjectById(int projectId)
        {
            return Ok(_projectService.GetProjectById(projectId));
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult CreateProject([FromBody] ProjectCreationViewModel project)
        {
            if (project.Songs.Count() > MaxNumberOfTracks)
            {
                throw new NumberOfTrackExceededException($"The project has exceeded the number of available tracks ({MaxNumberOfTracks})");
            }
            _projectService.CreateProject(project, User.Identity.Name);
            return Ok();
        }

        [HttpGet]
        [Route("status")]
        public IHttpActionResult GetProjectStatuses()
        {
            return Ok(_projectService.GetProjectStatus());
        }

        [HttpGet]
        [Route("user")]
        public IHttpActionResult GetProjectByUsername()
        {
            return Ok(_projectService.GetProjectsByUsername(User.Identity.Name));
        }
    }
}
