using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class StudentService : IStudent
    {
        private readonly IGenericRepository<Student> _studentRepository;
        private readonly StudentMapper _mapper;

        public StudentService(IGenericRepository<Student> genericRepository, StudentMapper mapper)
        {
            _studentRepository = genericRepository;
            _mapper = mapper;
        }

        public async Task AddStudentAsync(Student std)
        {
            await _studentRepository.AddAsync(std);
        }

        public async Task DeleteStudentAsync(int stdId)
        {
            try
            {
                var students = await _studentRepository.GetByIdAsync(stdId);
                if (students != null)
                {
                    students.IsActive = false;
                    await _studentRepository.UpdateAsync(students);
                }
            }
            catch (Exception)
            {

                throw;
            }

        }

        public async Task<List<Student>> GetAllStudentAsync()
        {
            return (await _studentRepository.GetAllAsync()).ToList();
        }

        public async Task<List<StudentDTO>> GetAllStudentClassWiseAsync(int classId)
        {
            try
            {
                var result = await _studentRepository.GetAllAsync(
                    include: query => query
                    .Include(c => c.Class)
                    );
                var students = result.Where(x => x.ClassId == classId).ToList();
                var studentData = students.Select(c => _mapper.MapToDto(c)).ToList();
                return studentData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        //public async Task<Student> GetStudentByIdAsync(int stdId)
        //{
        //    return await _studentRepository.GetByIdAsync(stdId);
        //}

        public async Task UpdateStudentAsync(Student std)
        {
            await _studentRepository.UpdateAsync(std);
        }

        Task<StudentDTO> IStudent.GetStudentByIdAsync(int stdId)
        {
            throw new NotImplementedException();
        }
    }
}
