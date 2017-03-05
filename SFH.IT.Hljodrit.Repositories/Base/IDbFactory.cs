using System;
using SFH.IT.Hljodrit.Models;


namespace SFH.IT.Hljodrit.Repositories.Base
{
    public interface IDbFactory : IDisposable
    {
        HljodritEntities Init();
    }
}
