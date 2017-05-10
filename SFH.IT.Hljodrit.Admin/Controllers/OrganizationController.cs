using System.Web.Http;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/organizations")]
    public class OrganizationController : ApiController
    {
        private readonly IOrganizationService _organizationService;

        public OrganizationController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        [HttpGet]
        [Route("{publisherId:int}/isrc-series")]
        public IHttpActionResult GetPublisherIsrcSeriesById(int publisherId)
        {
            return Ok(_organizationService.GetPublisherIsrcSeriesById(publisherId));
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllPublishers([FromUri] int pageSize, [FromUri] int pageNumber, [FromUri] string searchTerm)
        {
            return Ok(_organizationService.GetAllPublishers(pageSize, pageNumber, searchTerm ?? ""));
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult CreatePublisher([FromBody] PublisherViewModel publisher)
        {
            return Ok(_organizationService.CreatePublisher(publisher));
        }

        [HttpGet]
        [Route("{publisherId:int}")]
        public IHttpActionResult GetPublisherById(int publisherId)
        {
            return Ok(_organizationService.GetPublisherById(publisherId));
        }

        [HttpPut]
        [Route("{publisherId:int}")]
        public IHttpActionResult UpdatePublisherInfo(int publisherId, [FromBody] PublisherViewModel updatedPublisher)
        {
            return Ok(_organizationService.UpdatePublisherInfo(publisherId, updatedPublisher));
        }

        [HttpGet]
        [Route("{publisherId:int}/labels")]

        public IHttpActionResult GetLabelsByPublisherId(int publisherId)
        {
            return Ok(_organizationService.GetLabelsByPublisherId(publisherId));
        }

        [HttpPost]
        [Route("{publisherId:int}/labels")]
        public IHttpActionResult AddLabelsByPublisherId(int publisherId, [FromBody] LabelDto label)
        {
            return Ok(_organizationService.AddLabelByPublisherId(publisherId, label));
        }

        [HttpPost]
        [Route("{publisherId:int}/isrc")]
        public IHttpActionResult AddIsrcSeriesByPublisherId(int publisherId, [FromBody] PublisherIsrcViewModel newIsrcSeries)
        {
            return Ok(_organizationService.AddIsrcByPublisherId(publisherId, newIsrcSeries));
        }
    }
}
