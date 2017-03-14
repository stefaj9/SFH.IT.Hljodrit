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
        [Route("{publisherId:int}/labels")]
        public IHttpActionResult GetPublisherLabelsById(int publisherId)
        {
            return Ok(_organizationService.GetPublisherLabelsById(publisherId));
        }

    }
}
