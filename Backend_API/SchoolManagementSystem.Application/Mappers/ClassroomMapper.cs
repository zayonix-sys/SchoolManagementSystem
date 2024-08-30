using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ClassroomMapper : IMapper<ClassroomDTO, Classroom>
    {
        public Classroom MapToEntity(ClassroomDTO dto)
        {
            return new Classroom
            {
                ClassroomId = dto.ClassroomId,
                CampusId = dto.CampusId,
                RoomNumber = dto.RoomNumber,
                Building = dto.Building,
                Capacity = dto.Capacity,
                CreatedAt = dto.CreatedAt,
                CreatedBy = dto?.CreatedBy,
                UpdatedAt = dto.UpdatedAt,
                UpdatedBy = dto?.UpdatedBy,
                IsActive = dto.IsActive,

            };
        }
        public ClassroomDTO MapToDto(Classroom entity)
        {
            return new ClassroomDTO
            {
                ClassroomId = entity.ClassroomId,
                CampusId = entity.CampusId,
                RoomNumber = entity.RoomNumber,
                Building = entity.Building,
                Capacity = entity.Capacity,
                CreatedAt = entity.CreatedAt,
                CreatedBy = entity?.CreatedBy,
                UpdatedAt = entity.UpdatedAt,
                UpdatedBy = entity?.UpdatedBy,
                IsActive = entity.IsActive,
            };
        }

    }
}
