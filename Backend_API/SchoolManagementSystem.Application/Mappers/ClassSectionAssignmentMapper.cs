﻿using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ClassSectionAssignmentMapper : IMapper<ClassSectionAssignmentDTO, ClassSectionAssignment>
    {
        public ClassSectionAssignment MapToEntity(ClassSectionAssignmentDTO dto)
        {
            return new ClassSectionAssignment
            {
                AssignmentId = dto.AssignmentId,
                ClassId = dto.ClassId,
                SectionId = dto.SectionId,
                ClassroomId = dto.ClassroomId,
                IsActive = dto.IsActive,
            };
        }
        public ClassSectionAssignmentDTO MapToDto(ClassSectionAssignment entity)
        {
            return new ClassSectionAssignmentDTO
            {
                AssignmentId = entity.AssignmentId,
                ClassroomId = entity.ClassroomId,
                ClassId = entity.ClassId,
                SectionId = entity.SectionId,
                IsActive = entity.IsActive,
                
            };
        }

    }
}