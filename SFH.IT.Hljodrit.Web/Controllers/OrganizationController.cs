using System.Web.Http;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    /// <summary>
    /// Used for organization methods 
    /// </summary>
    [Authorize]
    [RoutePrefix("api/organizations")]
    public class OrganizationController : ApiController
    {
        private readonly IOrganizationService _organizationService;

        public OrganizationController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }
        /// <summary>
        /// Get all ISRC-series associated with a publisher. This series determines the ISRC number associated with each media which has been released.
        /// </summary>
        /// <param name="publisherId">The ID of the publisher which is associated with the ISRC series</param>
        /// <returns>A list of ISRC series associated with a given publisher</returns>
        [HttpGet]
        [Route("{publisherId:int}/isrc-series")]
        public IHttpActionResult GetPublisherIsrcSeriesById(int publisherId)
        {
            return Ok(_organizationService.GetPublisherIsrcSeriesById(publisherId));
        }

        /// <summary>
        /// Retrieves all publishers given a certain criteria
        /// </summary>
        /// <param name="pageSize">This is a page size used within an envelope used for paging</param>
        /// <param name="pageNumber">This is a page number used within an envelope used for paging</param>
        /// <param name="searchTerm">This is a search term uesd to search within the organization name</param>
        /// <returns>A list of publishers</returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllPublishers([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm)
        {
            return Ok(_organizationService.GetAllPublishers(pageSize, pageNumber, searchTerm ?? ""));
        }

        /// <summary>
        /// Retrieves all labels associated with a certain publisher
        /// </summary>
        /// <param name="publisherId">The ID of the publisher which is associated with the labels</param>
        /// <returns>A list of labels</returns>
        [HttpGet]
        [Route("{publisherId:int}/labels")]
        public IHttpActionResult GetLabelsByPublisherId(int publisherId)
        {
            return Ok(_organizationService.GetLabelsByPublisherId(publisherId));
        }
        /// <summary>
        /// Creates a new label associated with a publisher
        /// </summary>
        /// <param name="publisherId">The ID of the publisher which should own the newly created label</param>
        /// <param name="label">The model to create the label (LabelDto)</param>
        /// <returns>OK if it succeeded, otherwise Bad request</returns>
        [HttpPost]
        [Route("{publisherId:int}/labels")]
        public IHttpActionResult AddLabelsByPublisherId(int publisherId, [FromBody] LabelDto label)
        {
            return Ok(_organizationService.AddLabelByPublisherId(publisherId, label));
        }
    }
}
