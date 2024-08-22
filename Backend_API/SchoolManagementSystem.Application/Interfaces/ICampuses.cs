using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface ICampuses
    {
        Task<List<Campus>> GetAllCampusesAsync();
        Task<Campus> GetCampusByIdAsync(int campusId);
        Task AddCampusAsync(Campus campus);
        Task UpdateCampusAsync(int id, Campus campus);
        Task DeleteCampusAsync(int campusId);
        
    }
}
