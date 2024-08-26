using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IStudent
    {
        Task<List<Student>> GetAllStudentAsync();
        Task<Student> GetStudentByIdAsync(int stdId);
        Task AddStudentAsync(Student std);
        Task UpdateStudentAsync(int id, Student std);
        Task DeleteStudentAsync(int stdId);

    }
}
