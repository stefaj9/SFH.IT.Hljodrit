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
        public IHttpActionResult GetAllProjects([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] bool pending, [FromUri] bool resent, [FromUri] bool approved, [FromUri] string query)
        {
            // TODO: Introduce a filter for the data as well as a search input
            return Ok(_projectService.GetAllProjects(pageSize, pageNumber, pending, resent, approved, query ?? ""));
        }
    }
}
