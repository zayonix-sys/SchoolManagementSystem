using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class EmployeesMapper : IMapper<EmployeesDTO, Employee>
    {
        public Employee MapToEntity(EmployeesDTO dto)
        {
            return new Employee
            {
                EmployeeId = dto.EmployeeId,
                RoleId = dto.RoleId,
                CampusId = dto.CampusId,
                DepartmentId = dto.DepartmentId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                HireDate = dto.HireDate,
                Department = dto.Department,
                Address = dto.Address,
                EmergencyContact = dto.EmergencyContact,
                Qualifications = dto.Qualifications,
                CreatedAt = dto.CreatedAt ?? DateTime.Now,
                CreatedBy = dto.CreatedBy,
                UpdatedAt = dto.UpdatedAt,
                UpdatedBy = dto.UpdatedBy,
                IsActive = dto.IsActive,
            };
        }

        public EmployeesDTO MapToDto(Employee entity)
        {
            return new EmployeesDTO
            {
                EmployeeId = entity.EmployeeId,
                RoleId = entity.RoleId,
                CampusId = entity.CampusId,
                DepartmentId = entity.DepartmentId,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber,
                HireDate = entity.HireDate,
                Department = entity.Department,
                Address = entity.Address,
                EmergencyContact = entity.EmergencyContact,
                Qualifications = entity.Qualifications,
                CreatedAt = entity.CreatedAt,
                CreatedBy = entity.CreatedBy,
                UpdatedAt = entity.UpdatedAt,
                UpdatedBy = entity.UpdatedBy,
                IsActive = entity.IsActive
            };
        }


        public EmployeesDTO MapToDtoWithSubEntity(Employee entity)
        {
            return new EmployeesDTO
            {
                EmployeeId = entity.EmployeeId,
                RoleId = entity.RoleId,
                CampusId = entity.CampusId,
                DepartmentId = entity.DepartmentId,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber,
                HireDate = entity.HireDate,
                Department = entity.Department,
                Address = entity.Address,
                EmergencyContact = entity.EmergencyContact,
                Qualifications = entity.Qualifications,
                CreatedAt = entity.CreatedAt,
                CreatedBy = entity.CreatedBy,
                UpdatedAt = entity.UpdatedAt,
                UpdatedBy = entity.UpdatedBy,
                IsActive = entity.IsActive,

                // Map related entities
                Campuses = entity.Campuses.Select(d => new CampusDTO
                {
                    CampusId = d.CampusId,
                    CampusName = d.CampusName,
                    IsActive = d.IsActive,
                    Departments = (ICollection<DepartmentDTO>)d.Departments.Select(e => new DepartmentDTO
                    {
                        DepartmentId = e.DepartmentId,
                        DepartmentName = e.DepartmentName,
                        IsActive = e.IsActive,
                    })
                }).ToList(),
            };
        }

    }
}
