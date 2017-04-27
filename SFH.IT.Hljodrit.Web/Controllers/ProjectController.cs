using System.Web.Http;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    [RoutePrefix("api/projects")]
    public class ProjectController : ApiController
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult CreateProject([FromBody] ProjectCreationViewModel project)
        {
            _projectService.CreateProject(project);
            return Ok();
        }

        [HttpGet]
        [Route("status")]
        public IHttpActionResult GetProjectStatuses()
        {
            return Ok(_projectService.GetProjectStatus());
        }
    }
}
