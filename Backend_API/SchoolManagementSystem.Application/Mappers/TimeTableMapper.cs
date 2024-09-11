using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class TimeTableMapper : IMapper<TimeTableDTO, TimeTable>
    {


        public TimeTable MapToEntity(TimeTableDTO dto)
        {
            return new TimeTable
            {
                TimetableId = dto.TimetableId,
                CampusId = dto.CampusId,
                ClassId = dto.ClassId,
                SubjectId = dto.SubjectId,
                DayOfWeek = dto.DayOfWeek,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                CreatedAt = dto.CreatedAt,
                CreatedBy = dto.CreatedBy,
            };
        }
        public TimeTableDTO MapToDto(TimeTable entity)
        {
            return new TimeTableDTO
            {
                TimetableId = entity.TimetableId,
                CampusId = entity.CampusId,
                ClassId = entity.ClassId,
                SubjectId = entity.SubjectId,
                DayOfWeek = entity.DayOfWeek,
                StartTime = entity.StartTime,
                EndTime = entity.EndTime,
                CampusName = entity?.Campus?.CampusName,
                ClassName = entity?.Class?.ClassName,
                SubjectName = entity?.Subject?.SubjectName
            };
        }

        public List<TimeTable> MapToEntities(TimeTableDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
