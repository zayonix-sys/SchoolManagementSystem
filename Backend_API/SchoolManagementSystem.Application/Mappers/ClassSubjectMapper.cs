using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ClassSubjectMapper : IMapper<ClassSubjectAssignmentDTO, List<ClassSubject>>
    {
        public List<ClassSubject> MapToEntity(ClassSubjectAssignmentDTO dto)
        {
            var entities = new List<ClassSubject>();
            foreach (var subjectId in dto.SubjectIds)
            {
                entities.Add(new ClassSubject
                {
                    ClassSubjectId = dto.ClassSubjectId,
                    ClassId = dto.ClassId,
                    SubjectId = subjectId,
                    IsActive = dto.IsActive,
                });
            }
            return entities;
        }

        public ClassSubjectAssignmentDTO MapToDto(ClassSubject entity)
        {
            return new ClassSubjectAssignmentDTO
            {
                ClassSubjectId = entity.ClassSubjectId,
                ClassId = entity.ClassId,
                SubjectIds = entity.SubjectId.HasValue ? new List<int> { entity.SubjectId.Value } : new List<int>(),
                IsActive = entity.IsActive,
            };
        }

        public ClassSubjectAssignmentDTO MapToDto(List<ClassSubject> entity)
        {
            throw new NotImplementedException();
        }
    }

}
