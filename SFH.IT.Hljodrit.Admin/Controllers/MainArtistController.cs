using System.Web.Http;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [RoutePrefix("api/mainartists")]
    public class MainArtistController : ApiController
    {
        private readonly IMainArtistService _mainArtistService;

        public MainArtistController(IMainArtistService mainArtistService)
        {
            _mainArtistService = mainArtistService;
        }

        [Route("")]
        public IHttpActionResult GetMainArtistsByCriteria([FromUri] int pageSize, [FromUri] int pageNumber,
            [FromUri] string searchTerm)
        {
            return Ok(_mainArtistService.GetMainArtistByCriteria(pageSize, pageNumber, searchTerm ?? ""));
        }
    }
}
