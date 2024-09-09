using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class SubjectTeacherAssignmentMapper : IMapper<SubjectTeacherAssignmentDTO, SubjectTeacherAssignment>
    {
        public SubjectTeacherAssignment MapToEntity(SubjectTeacherAssignmentDTO dto)
        {
            return new SubjectTeacherAssignment
            {
                SubjectTeacherId = dto.SubjectTeacherId,
                SubjectId = dto.SubjectId,
                EmployeeId = dto.EmployeeId,
                IsActive = dto.IsActive,
            };
        }
        public SubjectTeacherAssignmentDTO MapToDto(SubjectTeacherAssignment entity)
        {
            return new SubjectTeacherAssignmentDTO
            {
                SubjectTeacherId = entity.SubjectTeacherId,
                SubjectId = entity.SubjectId,
                EmployeeId = entity.EmployeeId,
                EmployeeRoleName = entity.Employee.EmployeeRole.RoleName,
                SubjectName = entity.Subject.SubjectName,
                EmployeeName = $"{entity.Employee.FirstName} {entity.Employee.LastName}",
                IsActive = entity.IsActive,

            };
        }

    }
}
