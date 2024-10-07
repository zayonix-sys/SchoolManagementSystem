using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IStudent
    {
        Task<List<Student>> GetAllStudentAsync();
        Task<List<StudentDTO>> GetAllStudentClassWiseAsync(int? classId);
        Task<StudentDTO> GetStudentByIdAsync(int stdId);
        Task AddStudentAsync(Student std);
        Task UpdateStudentAsync(Student std);
        Task DeleteStudentAsync(int stdId);

        Task UpdateStudentDataAsync(StudentDTO std);

    }
}
