using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class EmployeesService : IEmployees
    {
        private readonly IGenericRepository<Employee> _employeeRepository;
        private readonly EmployeesMapper _mapper;

        public EmployeesService(IGenericRepository<Employee> genericRepository, EmployeesMapper employeeMapper)
        {
            _employeeRepository = genericRepository;
            _mapper = employeeMapper;
        }

        public async Task AddEmployeeAsync(EmployeesDTO dto)
        {
            var model = _mapper.MapToEntity(dto);
            await _employeeRepository.AddAsync(model);
        }

        public async Task DeleteEmployeeAsync(int employeeId)
        {
            var employee = await _employeeRepository.GetByIdAsync(employeeId);
            if (employee != null)
            {
                employee.IsActive = false;
                await _employeeRepository.UpdateAsync(employee);
            }
        }

        public async Task<List<EmployeesDTO>> GetAllEmployeesAsync()
        {
            try
            {
                var employees = await _employeeRepository.GetAllAsync(
                    include: query => query.Include(c => c.Campuses.Where(d => d.IsActive))
                 );
                var activeEmployees = employees.Where(c => c.IsActive).ToList();

                var result = activeEmployees.Select(c => _mapper.MapToDtoWithSubEntity(c)).ToList();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<EmployeesDTO> GetEmployeeByIdAsync(int employeeId)
        {
           var result = await _employeeRepository.GetByIdAsync(employeeId);
            return _mapper.MapToDto(result);
        }

        public async Task UpdateEmployeeAsync(EmployeesDTO emp)
        {
            var model = _mapper.MapToEntity(emp);
            await _employeeRepository.UpdateAsync(model);
        }
    }
}
