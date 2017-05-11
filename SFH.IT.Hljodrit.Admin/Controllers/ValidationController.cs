using System;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace SFH.IT.Hljodrit.Admin.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/validation")]
    public class ValidationController : ApiController
    {
        public ApplicationUserManager UserManager => Request.GetOwinContext().GetUserManager<ApplicationUserManager>();

        [HttpGet]
        [Route("validateuser")]
        public void ValidateUser()
        {
            if (User?.Identity == null || !User.Identity.IsAuthenticated)
            {
                throw new UnauthorizedAccessException("User not logged in.");
            }

            // Require the user to have a confirmed email before they can log on.
            var user = UserManager.FindByEmail(User.Identity.Name);
            if (!User.IsInRole("Admin"))
            {
                throw new UnauthorizedAccessException("User not in authorized role.");
            }
            if (user != null)
            {
                if (!user.EmailConfirmed)
                {
                    throw new UnauthorizedAccessException("You must have a confirmed email.");
                }
            }
        }
    }
}
