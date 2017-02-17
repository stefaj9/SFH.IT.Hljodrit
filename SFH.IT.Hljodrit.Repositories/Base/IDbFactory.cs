using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SFH.IT.Hljodrit.Models;


namespace SFH.IT.Hljodrit.Repositories.Base
{
    public interface IDbFactory : IDisposable
    {
        HljodritEntities Init();
    }
}
