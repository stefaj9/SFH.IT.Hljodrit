using System.Linq;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Authentication;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Authentication
{
    public class UserLookupRepository : RepositoryBase<aspnet_Users, HljodritAuthModel>, IUserLookupRepository
    {
        public UserLookupRepository(IDbFactory<HljodritAuthModel> dbFactory) : base(dbFactory)
        {
        }

        public string GetEmailByUsername(string username)
        {
            var user = DbContext.aspnet_Users.FirstOrDefault(u => u.UserName == username);

            if (user != null)
            {
                return user.aspnet_Membership.Email;
            }

            return "";
        }
    }
}
