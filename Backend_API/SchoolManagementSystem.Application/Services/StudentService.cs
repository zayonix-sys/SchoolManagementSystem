using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Services
{
    public class StudentService : IStudent
    {
        private readonly IGenericRepository<Student> _studentRepository;

        public StudentService(IGenericRepository<Student> genericRepository)
        {
            _studentRepository = genericRepository;
        }

        public async Task AddStudentAsync(Student std)
        {
            await _studentRepository.AddAsync(std);
        }

        public async Task DeleteStudentAsync(int stdId)
        {
            await _studentRepository.DeleteAsync(stdId);
        }

        public async Task<List<Student>> GetAllStudentAsync()
        {
            return (await _studentRepository.GetAllAsync()).ToList();
        }

        public async Task<Student> GetStudentByIdAsync(int stdId)
        {
            return await _studentRepository.GetByIdAsync(stdId);
        }

        public async Task UpdateStudentAsync(Student std)
        {
            //await _studentRepository.UpdateAsync(std);
        }
    }
}
