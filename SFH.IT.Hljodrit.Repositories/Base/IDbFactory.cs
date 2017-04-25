using System;
using System.Data.Entity;
using SFH.IT.Hljodrit.Models;


namespace SFH.IT.Hljodrit.Repositories.Base
{
    public interface IDbFactory<TD> : IDisposable where TD : DbContext
    {
        DbContext Init();
    }
}
