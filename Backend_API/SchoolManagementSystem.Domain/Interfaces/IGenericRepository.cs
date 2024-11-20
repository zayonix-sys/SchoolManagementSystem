using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace SchoolManagementSystem.Domain.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> filter = null,
                                      Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);
        Task<T> GetByIdAsync(int id);
        Task<object> AddAsync(T entity);
        Task<object> UpdateAsync(T entity);
        Task DeleteAsync(int id);
        Task DeleteAsync(T entity);
    }
}
