using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IStudent
    {
        Task<List<Student>> GetAllStudentAsync();
        Task<Student> GetStudentByIdAsync(int stdId);
        Task AddStudentAsync(Student std);
        Task UpdateStudentAsync(Student std);
        Task DeleteStudentAsync(int stdId);
        
    }
}
