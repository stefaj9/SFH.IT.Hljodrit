using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
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

        [HttpGet]
        [Route("{publisherId:int}/labels")]

        public IHttpActionResult GetLabelsByPublisherId(int publisherId)
        {
            return Ok(_organizationService.GetLabelsByPublisherId(publisherId));
        }
    }
}
