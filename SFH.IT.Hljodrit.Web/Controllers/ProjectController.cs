using System.Web.Http;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    [RoutePrefix("api/projects")]
    public class ProjectController : ApiController
    {
        [HttpPost]
        [Route("")]
        public IHttpActionResult CreateProject()
        {
            return Ok();
        }
    }
}
