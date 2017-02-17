using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Repositories.Base
{
    public class DbFactory : Disposable, IDbFactory
    {
        private HljodritEntities _dbContext;

        public HljodritEntities Init()
        {
            return _dbContext ?? (_dbContext = new HljodritEntities());
        }

        protected override void DisposeCore()
        {
            if (_dbContext != null)
                _dbContext.Dispose();
        }
    }
}
