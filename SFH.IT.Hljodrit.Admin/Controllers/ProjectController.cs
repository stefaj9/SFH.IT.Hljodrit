using System.Web.Http;
using SFH.IT.Hljodrit.Common.ViewModels;
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
        public IHttpActionResult GetAllProjects([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] bool inWorkingState, [FromUri] bool recordingFinished, [FromUri] bool readyForPublish, [FromUri] bool published, [FromUri] string query)
        {
            // TODO: Introduce a filter for the data as well as a search input
            return Ok(_projectService.GetAllProjects(pageSize, pageNumber, inWorkingState, recordingFinished, readyForPublish, published, query ?? ""));
        }

        [HttpGet]
        [Route("{projectId:int}")]
        public IHttpActionResult GetProjectById(int projectId)
        {
            return Ok(_projectService.GetProjectById(projectId));
        }

        [HttpGet]
        [Route("{projectId:int}/tracks")]
        public IHttpActionResult GetProjectTracksById(int projectId)
        {
            return Ok(_projectService.GetProjectTracksById(projectId));
        }

        [HttpDelete]
        [Route("{projectId:int}")]
        public IHttpActionResult MarkProjectAsDeleted(int projectId)
        {
            return Ok(_projectService.MarkProjectAsDeleted(projectId));
        }

        [HttpPut]
        [Route("{projectId:int}/publish")]
        public IHttpActionResult PublishProjectById(int projectId, [FromBody] ProjectReviewViewModel reviewModel)
        {
            var albumId = _projectService.PublishProjectById(projectId, reviewModel);
            return Ok(albumId);
        }
    }
}
