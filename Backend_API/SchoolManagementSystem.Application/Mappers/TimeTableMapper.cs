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
                PeriodId = dto.PeriodId,
                DayOfWeek = dto.DayOfWeek,
                CreatedAt = dto.CreatedAt,
                CreatedBy = dto.CreatedBy,
            };
        }
        public TimeTableDTO MapToDto(TimeTable entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new TimeTableDTO
            {
                TimetableId = entity.TimetableId,
                CampusId = entity.CampusId,
                ClassId = entity.ClassId,
                SubjectId = entity.SubjectId,
                PeriodId = entity.PeriodId,
                DayOfWeek = entity.DayOfWeek,
                CampusName = entity?.Campus?.CampusName,
                ClassName = entity?.Class?.ClassName,
                SubjectName = entity?.Subject?.SubjectName,
                PeriodName = entity?.Period.PeriodName,
                StartTime = entity?.Period.StartTime,
                EndTime = entity?.Period.EndTime
            };
        }

        public List<TimeTable> MapToEntities(TimeTableDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
