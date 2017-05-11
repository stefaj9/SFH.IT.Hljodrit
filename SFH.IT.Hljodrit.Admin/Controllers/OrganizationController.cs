using System.Web.Http;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    /// <summary>
    /// Handles all operations regarding organization which is the same as publisher in
    /// the system.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/organizations")]
    public class OrganizationController : ApiController
    {
        private readonly IOrganizationService _organizationService;

        public OrganizationController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        /// <summary>
        /// Gets all isrc series belonging to a publisher. 
        /// </summary>
        /// <param name="publisherId">The id of the publisher to retrieve isrc series from.</param>
        /// <returns>An IEnumerable of all the isrc series belonging to the publisher.</returns>
        [HttpGet]
        [Route("{publisherId:int}/isrc-series")]
        public IHttpActionResult GetPublisherIsrcSeriesById(int publisherId)
        {
            return Ok(_organizationService.GetPublisherIsrcSeriesById(publisherId));
        }

        /// <summary>
        /// Gets all publishers and returns in an envelope. Can be filtered by a search string.
        /// </summary>
        /// <param name="pageSize">The number of results to be included in the result envelope.</param>
        /// <param name="pageNumber">The number of the page to be returned.</param>
        /// <param name="searchTerm">The search term to filter the results by.</param>
        /// <returns>An envelope containing the resulting publishers.</returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllPublishers([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm)
        {
            return Ok(_organizationService.GetAllPublishers(pageSize, pageNumber, searchTerm ?? ""));
        }

        /// <summary>
        /// Creates a new publisher in the system.
        /// </summary>
        /// <param name="publisher">A PublisherViewModel of the new publisher to be created.</param>
        /// <returns>A PublisherExtendedDto object of the newly created publisher.</returns>
        [HttpPost]
        [Route("")]
        public IHttpActionResult CreatePublisher([FromBody] PublisherViewModel publisher)
        {
            return Ok(_organizationService.CreatePublisher(publisher));
        }

        /// <summary>
        /// Gets a publisher by its id.
        /// </summary>
        /// <param name="publisherId">The id of the publisher to be retrieved.</param>
        /// <returns>A PublisherExtendedDto object of the publisher to retrieve.</returns>
        [HttpGet]
        [Route("{publisherId:int}")]
        public IHttpActionResult GetPublisherById(int publisherId)
        {
            return Ok(_organizationService.GetPublisherById(publisherId));
        }

        /// <summary>
        /// Updates a publishers information.
        /// </summary>
        /// <param name="publisherId">The id of the publisher to update.</param>
        /// <param name="updatedPublisher">A PublisherViewModel containing the updated information.</param>
        /// <returns>A PublisherExtendedDto containing the updated information.</returns>
        [HttpPut]
        [Route("{publisherId:int}")]
        public IHttpActionResult UpdatePublisherInfo(int publisherId, [FromBody] PublisherViewModel updatedPublisher)
        {
            return Ok(_organizationService.UpdatePublisherInfo(publisherId, updatedPublisher));
        }

        /// <summary>
        /// Gets all labels belonging to a certain publisher.
        /// </summary>
        /// <param name="publisherId">The id of the publisher to retrieve labels from.</param>
        /// <returns>An IEnumerable of all the labels belonging to the publishers.</returns>
        [HttpGet]
        [Route("{publisherId:int}/labels")]
        public IHttpActionResult GetLabelsByPublisherId(int publisherId)
        {
            return Ok(_organizationService.GetLabelsByPublisherId(publisherId));
        }

        /// <summary>
        /// Adds a new label to a publisher by the publishers id.
        /// </summary>
        /// <param name="publisherId">The id of the publisher to add a label to.</param>
        /// <param name="label">A LabelDto of the label to add to the publisher.</param>
        /// <returns>The LabelDto of the newly created label.</returns>
        [HttpPost]
        [Route("{publisherId:int}/labels")]
        public IHttpActionResult AddLabelsByPublisherId(int publisherId, [FromBody] LabelDto label)
        {
            return Ok(_organizationService.AddLabelByPublisherId(publisherId, label));
        }

        /// <summary>
        /// Adds a new isrc series to a publisher.
        /// </summary>
        /// <param name="publisherId">The id of the publisher to add a isrc series to.</param>
        /// <param name="newIsrcSeries">A PublisherIsrcSeriesViewModel of the isrc series to add.</param>
        /// <returns>A PublisherIsrcSeriesViewModel of the newly created isrc serie.</returns>
        [HttpPost]
        [Route("{publisherId:int}/isrc")]
        public IHttpActionResult AddIsrcSeriesByPublisherId(int publisherId, [FromBody] PublisherIsrcViewModel newIsrcSeries)
        {
            return Ok(_organizationService.AddIsrcByPublisherId(publisherId, newIsrcSeries));
        }
    }
}
