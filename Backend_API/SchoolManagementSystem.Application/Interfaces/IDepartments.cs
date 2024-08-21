using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IDepartments
    {
        Task<List<Department>> GetAllDepartmentsAsync();
        Task<Department> GetDepartmentByIdAsync(int departmentId);
        Task AddDepartmentAsync(Department department);
        Task UpdateDepartmentAsync(int id, Department department);
        Task DeleteDepartmentAsync(int departmentId);
        
    }
}
