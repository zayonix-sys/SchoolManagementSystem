using SchoolManagementSystem.Application.DTOs;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface ITimeTable
    {
        Task<List<TimeTableDTO>> GetAllTimeTablesAsync();
        Task AddTimeTableAsync(TimeTableDTO dto);
        Task UpdateTimeTableAsync(TimeTableDTO dto);
        Task DeleteTimeTableAsync(int timeTableId);

    }
}
