using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class DepartmentService : IDepartments
    {
        private readonly IGenericRepository<Department> _departmentRepository;

        public DepartmentService(IGenericRepository<Department> genericRepository)
        {
            _departmentRepository = genericRepository;
        }

        public async Task AddDepartmentAsync(Department department)
        {
            await _departmentRepository.AddAsync(department);
        }

        public async Task DeleteDepartmentAsync(int departmentId)
        {
            await _departmentRepository.DeleteAsync(departmentId);
        }

        public async Task<List<Department>> GetAllDepartmentsAsync()
        {
            return (await _departmentRepository.GetAllAsync()).ToList();
        }

        public async Task<Department> GetDepartmentByIdAsync(int departmentId)
        {
            return await _departmentRepository.GetByIdAsync(departmentId);
        }

        public async Task UpdateDepartmentAsync(int id, Department department)
        {
            //await _departmentRepository.UpdateAsync(id, department);
        }
    }
}
