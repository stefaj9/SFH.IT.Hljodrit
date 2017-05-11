using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using SFH.IT.Hljodrit.Admin.Models;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        private ApplicationUserManager _applicationUserManager;
        private const string AdminRoleId = "1";

        public ApplicationUserManager UserManager
        {
            get
            {
                return _applicationUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _applicationUserManager = value;
            }
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllUsersInAdminGroup()
        {
            return Ok(UserManager.Users.Where(u => u.Roles.Any(r => r.RoleId == AdminRoleId)).Select(u => new UserDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email
            }));
        }

        [HttpDelete]
        [Route("{userId}/delete")]
        public async Task<IHttpActionResult> DeleteUserById(string userId)
        {
            await UserManager.RemoveFromRoleAsync(userId, "Admin");
            return Ok();
        }
    }
}
