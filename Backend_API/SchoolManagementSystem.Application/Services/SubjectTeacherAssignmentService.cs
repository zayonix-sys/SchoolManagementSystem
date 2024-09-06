using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class SubjectTeacherAssignmentService : ISubjectTeacherAssignment
    {
        private readonly IGenericRepository<SubjectTeacherAssignment> _SubjectTeacherAssignmentRepository;
        private readonly SubjectTeacherAssignmentMapper _mapper;
        private readonly IEmployeeRoles _employeeRoles;

        public SubjectTeacherAssignmentService(IGenericRepository<SubjectTeacherAssignment> genericRepository, SubjectTeacherAssignmentMapper subjectTeacherAssignmentMapper, IEmployeeRoles employeeRoles)
        {
            _SubjectTeacherAssignmentRepository = genericRepository;
            _mapper = subjectTeacherAssignmentMapper;
            _employeeRoles = employeeRoles;
        }

        public async Task AddSubjectTeacherAsync(SubjectTeacherAssignmentDTO subteach)
        {
            try
            {
                var model = _mapper.MapToEntity(subteach);
                await _SubjectTeacherAssignmentRepository.AddAsync(model);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task DeleteSubjectTeacherAsync(int assignmentId)
        {
            try
            {
                var result = await _SubjectTeacherAssignmentRepository.GetByIdAsync(assignmentId);
                if (result != null)
                {
                    result.IsActive = false;
                    await _SubjectTeacherAssignmentRepository.UpdateAsync(result);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<List<SubjectTeacherAssignmentDTO>> GetAllSubjectTeacherAsync()
        {
            try
            {
                //var empRole = await _employeeRoles.GetAllRolesAsync();
                //var teachers = empRole.Where(r => r.RoleName == "Teacher").ToList();
                var subjectAssignment = await _SubjectTeacherAssignmentRepository.GetAllAsync(
                    include: query => query
                    .Include(s => s.Subject)
                    .Include(e => e.Employee)
                    .ThenInclude(r => r.EmployeeRole)

                    );
                var activeSubject = subjectAssignment.Where(c => c.IsActive);
                var result = activeSubject.Where(a => a.Employee.EmployeeRole.RoleName == "Teacher");

                var subjectAssignmentDtos = result.Select(c => _mapper.MapToDto(c)).ToList();

                return subjectAssignmentDtos;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task UpdateSubjectTeacherAsync(SubjectTeacherAssignmentDTO subteach)
        {
            try
            {
                var model = _mapper.MapToEntity(subteach);

                await _SubjectTeacherAssignmentRepository.UpdateAsync(model);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //public Task<SubjectTeacherAssignmentDTO> GetSubjectTeacherByIdAsync(int subteachId)
        //{
        //    throw new NotImplementedException();
        //}

    }
}
