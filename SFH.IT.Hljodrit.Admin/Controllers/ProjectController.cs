using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [RoutePrefix("api/projects")]
    public class ProjectController : ApiController
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllProjects()
        {
            // TODO: Create mock data
            // TODO: Use paging to get the data
            // TODO: Introduce a filter for the data as well as a search input
            return Ok(_projectService.GetAllProjectMasters());
        }
    }
}
