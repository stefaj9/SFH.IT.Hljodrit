using System.Web.Http;
using SFH.IT.Hljodrit.Common.Helpers;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/mainartists")]
    public class MainArtistController : ApiController
    {
        private readonly IMainArtistService _mainArtistService;

        public MainArtistController(IMainArtistService mainArtistService)
        {
            _mainArtistService = mainArtistService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetMainArtistsByCriteria([FromUri] int pageSize, [FromUri] int pageNumber,
            [FromUri] string searchTerm)
        {
            return Ok(_mainArtistService.GetMainArtistByCriteria(pageSize, pageNumber, searchTerm ?? ""));
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult CreateMainArtist(PersonRegisterViewModel mainArtist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ValidationHelper.GenerateErrorMessage(ModelState.Values));
            }

            return Ok(_mainArtistService.AddMainArtist(mainArtist, User.Identity.Name));
        }
    }
}
