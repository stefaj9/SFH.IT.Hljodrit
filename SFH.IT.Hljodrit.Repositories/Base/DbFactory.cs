using System.Data.Entity;

namespace SFH.IT.Hljodrit.Repositories.Base
{
    public class DbFactory<T> : Disposable, IDbFactory<T> where T : DbContext, new()
    {
        private T _dbContext;

        public DbContext Init()
        {
            return _dbContext ?? (_dbContext = new T());
        }

        protected override void DisposeCore()
        {
            _dbContext?.Dispose();
        }
    }
}
