using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Authentication
{
    public interface IUserLookupRepository : IRepository<aspnet_Users>
    {
        string GetEmailByUsername(string username);
    }
}
