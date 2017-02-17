using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SFH.IT.Hljodrit.Repositories.Base
{
    public interface IUnitOfWork
    {
        void Commit();
    }
}
