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
    /// <summary>
    /// Used for all actions based on projects within the system
    /// </summary>
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
        /// <summary>
        /// Deletes a track on a project
        /// </summary>
        /// <param name="projectId">The project id, which the track is on</param>
        /// <param name="trackIds">List of track id's which are suppose to be deleted of the project</param>
        /// <returns>Ok if succeeded, otherwise Bad request</returns>
        [HttpDelete]
        [Route("{projectId:int}/tracks")]
        public IHttpActionResult DeleteProjectTracksById(int projectId, [FromBody] IEnumerable<int> trackIds)
        {
            _projectService.DeleteProjectTracksById(projectId, trackIds);
            return Ok();
        }
        /// <summary>
        /// Gets all track on a project
        /// </summary>
        /// <param name="projectId">The project ID which the tracks are on</param>
        /// <returns>List of tracks on a project</returns>
        [HttpGet]
        [Route("{projectId:int}/tracks")]
        public IHttpActionResult GetProjectTracksByProjectId(int projectId)
        {
            return Ok(_projectService.GetProjectTracksDtoById(projectId));
        }
        /// <summary>
        /// Adds a track to a project
        /// </summary>
        /// <param name="projectId">The project id to add on</param>
        /// <param name="track">The track model which is suppose to be added to the project</param>
        /// <returns>The newly created track</returns>
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
        /// <summary>
        /// Gets a project by id
        /// </summary>
        /// <param name="projectId">The project id</param>
        /// <returns>A project associated with the posted id</returns>
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
        /// <summary>
        /// Updates a project
        /// </summary>
        /// <param name="projectId">The project id which is suppose to be updated</param>
        /// <param name="project">The modified project</param>
        /// <returns>The updated project (ProjectExtendedDto)</returns>
        [HttpPut]
        [Route("{projectId:int}")]
        public IHttpActionResult UpdateProjectById(int projectId, [FromBody] ProjectExtendedDto project)
        {
            _projectService.UpdateProjectById(projectId, project, User.Identity.Name);
            return Ok(project);
        }
        /// <summary>
        /// Creates a new project
        /// </summary>
        /// <param name="project">The new project to create</param>
        /// <returns>OK if succeeded, otherwise Bad request</returns>
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
        /// <summary>
        /// Gets available project statuses
        /// </summary>
        /// <returns>List of available project statuses</returns>
        [HttpGet]
        [Route("status")]
        public IHttpActionResult GetProjectStatuses()
        {
            return Ok(_projectService.GetProjectStatus());
        }
        /// <summary>
        /// Get all project associated with the requesting user
        /// </summary>
        /// <returns>A list of projects</returns>
        [HttpGet]
        [Route("user")]
        public IHttpActionResult GetProjectByUsername()
        {
            return Ok(_projectService.GetProjectsByUsername(User.Identity.Name));
        }
    }
}
