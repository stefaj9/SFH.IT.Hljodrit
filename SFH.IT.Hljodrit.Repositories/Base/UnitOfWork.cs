using System.Data.Entity;

namespace SFH.IT.Hljodrit.Repositories.Base
{
    public class UnitOfWork<T> : IUnitOfWork<T> where T : DbContext
    {
        private readonly IDbFactory<T> _dbFactory;
        private T _dbContext;

        public UnitOfWork(IDbFactory<T> dbFactory)
        {
            this._dbFactory = dbFactory;
        }

        public T DbContext => _dbContext ?? (_dbContext = _dbFactory.Init() as T);

        public void Commit()
        {
            DbContext.SaveChanges();
        }
    }
}
