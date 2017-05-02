using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using SFH.IT.Hljodrit.Common.Dto;
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

        [HttpDelete]
        [Route("{projectId:int}/tracks")]
        public IHttpActionResult DeleteProjectTracksById(int projectId, [FromBody] IEnumerable<int> trackIds)
        {
            _projectService.DeleteProjectTracksById(projectId, trackIds);
            return Ok();
        }

        [HttpGet]
        [Route("{projectId:int}/tracks")]
        public IHttpActionResult GetProjectTracksByProjectId(int projectId)
        {
            return Ok(_projectService.GetProjectTracksDtoById(projectId));
        }

        [HttpPost]
        [Route("{projectId:int}/tracks")]
        public IHttpActionResult AddTrackToProjectById(int projectId, [FromBody] TrackDto track)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model is not valid.");
            }
            return Ok(_projectService.AddTrackToProjectById(projectId, track, User.Identity.Name));
        }

        [HttpGet]
        [Route("{projectId:int}")]
        public IHttpActionResult GetProjectById(int projectId)
        {
            var project = _projectService.GetProjectById(projectId);

            if (project == null)
            {
                return BadRequest("Project does not exist.");
            }
            if (project.SubmissionUser != User.Identity.Name)
            {
                return BadRequest("User is not allowed to view other users projects.");
            }

            return Ok(project);
        }

        [HttpPut]
        [Route("{projectId:int}")]
        public IHttpActionResult UpdateProjectById(int projectId, [FromBody] ProjectExtendedDto project)
        {
            _projectService.UpdateProjectById(projectId, project, User.Identity.Name);
            return Ok(project);
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
