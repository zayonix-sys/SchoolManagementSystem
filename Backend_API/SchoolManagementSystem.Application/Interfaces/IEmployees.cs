using SchoolManagementSystem.Application.DTOs;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IEmployees
    {
        Task<List<EmployeesDTO>> GetAllEmployeesAsync();
        Task<EmployeesDTO> GetEmployeeByIdAsync(int employeeId);
        Task AddEmployeeAsync(EmployeesDTO emp);
        Task UpdateEmployeeAsync(EmployeesDTO emp);
        Task DeleteEmployeeAsync(int employeeId);

    }
}
