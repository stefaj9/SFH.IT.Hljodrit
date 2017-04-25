using System.Data.Entity;

namespace SFH.IT.Hljodrit.Repositories.Base
{
    public interface IUnitOfWork<T> where T : DbContext
    {
        void Commit();
    }
}
