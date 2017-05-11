using System.Web.Http;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    /// <summary>
    /// Handles all operations regarding projects in the system. A Project is a name used for f.e. an album in the system. As a user registers 
    /// an album with its songs and musicians and such it is called a project. A project can be in different states f.e. in a working state, 
    /// recording finished, ready for publish and published.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/projects")]
    public class ProjectController : ApiController
    {
        private readonly IProjectService _projectService;
        private readonly IUserService _userService;

        public ProjectController(IProjectService projectService, IUserService userService)
        {
            _projectService = projectService;
            _userService = userService;
        }

        /// <summary>
        /// Gets all projects and is filterable by the state the project is in.
        /// </summary>
        /// <param name="pageSize">The number of results to be returned in the envelope.</param>
        /// <param name="pageNumber">The number of the page to be returned.</param>
        /// <param name="inWorkingState">Boolean that decides if projects that are marked as being in working state should be included.</param>
        /// <param name="recordingFinished">Boolean that decides if projects that are marked as having finished recording should be included.</param>
        /// <param name="readyForPublish">Boolean that decides if projects that are marked as being ready for publishing should be included.</param>
        /// <param name="published">Boolean that decides if projects that are marked as being published should be included.</param>
        /// <param name="query">A search query to search projects by.</param>
        /// <returns>An envelope containing the results.</returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllProjects([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] bool inWorkingState, [FromUri] bool recordingFinished, [FromUri] bool readyForPublish, [FromUri] bool published, [FromUri] string query)
        {
            // TODO: Introduce a filter for the data as well as a search input
            return Ok(_projectService.GetAllProjects(pageSize, pageNumber, inWorkingState, recordingFinished, readyForPublish, published, query ?? ""));
        }

        /// <summary>
        /// Gets a single project by its id.
        /// </summary>
        /// <param name="projectId">The id of the project to return.</param>
        /// <returns>A ProjectExtendedDto of the chosen project.</returns>
        [HttpGet]
        [Route("{projectId:int}")]
        public IHttpActionResult GetProjectById(int projectId)
        {
            return Ok(_projectService.GetProjectById(projectId));
        }

        /// <summary>
        /// Gets all tracks belonging to a particular project.
        /// </summary>
        /// <param name="projectId">The id of the project to get tracks from.</param>
        /// <returns>An IEnumerable of SongWithPerformersDto representing all songs belonging to the project.</returns>
        [HttpGet]
        [Route("{projectId:int}/tracks")]
        public IHttpActionResult GetProjectTracksById(int projectId)
        {
            return Ok(_projectService.GetProjectTracksById(projectId));
        }

        /// <summary>
        /// Deletes a project from the system by marking it as deleted. Does not physically remove it.
        /// </summary>
        /// <param name="projectId">The id of the project to mark as deleted.</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{projectId:int}")]
        public IHttpActionResult MarkProjectAsDeleted(int projectId)
        {
            return Ok(_projectService.MarkProjectAsDeleted(projectId));
        }

        /// <summary>
        /// Marks a project as published in the system.
        /// </summary>
        /// <param name="projectId">The id of the project to publish.</param>
        /// <param name="reviewModel">A model containing necessary information to be added when publishing a project.</param>
        /// <returns>The id of the published project.</returns>
        [HttpPut]
        [Route("{projectId:int}/publish")]
        public IHttpActionResult PublishProjectById(int projectId, [FromBody] ProjectReviewViewModel reviewModel)
        {
            var albumId = _projectService.PublishProjectById(projectId, reviewModel);
            return Ok(albumId);
        }

        /// <summary>
        /// Adds a comment to a single project.
        /// </summary>
        /// <param name="projectId">The id of the project to add a comment to.</param>
        /// <param name="commentModel">A ProjectCommentViewModel containing information regarding the comment to add.</param>
        /// <returns></returns>
        [HttpPost]
        [Route("{projectId:int}/comment")]
        public IHttpActionResult CommentProjectById(int projectId, [FromBody] ProjectCommentViewModel commentModel)
        {
            var project = _projectService.GetProjectById(projectId);
            _userService.SendCommentToUser(project.SubmissionUser, $"Athugasemd vegna {project.ProjectName} - Hljóðrit.is", commentModel.Comment);
            return Ok();
        }
    }
}
