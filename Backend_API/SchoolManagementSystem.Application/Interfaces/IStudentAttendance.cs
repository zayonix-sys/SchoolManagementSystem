using SchoolManagementSystem.Application.DTOs;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IStudentAttendance
    {

        Task<List<StudentAttendanceDTO>> GetAllStudentsAttendanceAsync();
        Task<StudentAttendanceDTO> GetStudentAttendanceByIdAsync(int stdId);

        Task<List<StudentAttendanceDTO>> GetStudentAttendanceByClassSectionId(int classId, int sectionId);
        Task AddStudentAttendanceAsync(StudentAttendanceDTO dto);
        Task UpdateStudentAttendanceAsync(StudentAttendanceDTO dto);
        Task DeleteStudentAttendanceAsync(int attendanceId);

    }
}
