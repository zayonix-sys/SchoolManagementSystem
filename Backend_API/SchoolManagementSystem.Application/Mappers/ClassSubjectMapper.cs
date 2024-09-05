using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ClassSubjectMapper : IMapper<ClassSubjectAssignmentDTO, ClassSubject>
    {
        public ClassSubject MapToEntity(ClassSubjectAssignmentDTO dto)
        {
            return new ClassSubject
            {
                ClassSubjectId = dto.ClassSubjectId,
                ClassId = dto.ClassId,
                SubjectId = dto.SubjectId,
                IsActive = dto.IsActive,
            };
        }
        public ClassSubjectAssignmentDTO MapToDto(ClassSubject entity)
        {
            return new ClassSubjectAssignmentDTO
            {
                ClassSubjectId = entity.ClassSubjectId,
                ClassId = entity.ClassId,
                SubjectId = entity.SubjectId,
                IsActive = entity.IsActive,

            };
        }

    }
}
