using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class ClassSectionAssignmentService : IClassSectionAssignment
    {
        private readonly IGenericRepository<ClassSectionAssignment> _classSectionAssignmentRepository;
        private readonly ClassSectionAssignmentMapper _mapper;

        public ClassSectionAssignmentService(IGenericRepository<ClassSectionAssignment> genericRepository, ClassSectionAssignmentMapper classSectionAssignmentMapper)
        {
            _classSectionAssignmentRepository = genericRepository;
            _mapper = classSectionAssignmentMapper;

        }

        public async Task AddClassSectionAssignmentAsync(ClassSectionAssignmentDTO classroom)
        {
            try
            {
                var model = _mapper.MapToEntity(classroom);
                await _classSectionAssignmentRepository.AddAsync(model);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task DeleteClassSectionAssignmentAsync(int assignmentId)
        {
            var result = await _classSectionAssignmentRepository.GetByIdAsync(assignmentId);
            if (result != null)
            {
                result.IsActive = false;
                await _classSectionAssignmentRepository.UpdateAsync(result);
            }
        }

        public async Task<List<ClassSectionAssignmentDTO>> GetAllClassesAssignmentAsync()
        {
            var classAssignment = await _classSectionAssignmentRepository.GetAllAsync();
            var activeClassrooms = classAssignment.Where(c => c.IsActive);

            // Map the entities to DTOs
            var classAssignmentDtos = activeClassrooms.Select(c => _mapper.MapToDto(c)).ToList();

            return classAssignmentDtos;
        }

        public async Task UpdateClassSectionAssignmentAsync(ClassSectionAssignmentDTO classroom)
        {
            var model = _mapper.MapToEntity(classroom);
            
            await _classSectionAssignmentRepository.UpdateAsync(model);
        }


        Task<ClassSectionAssignment> IClassSectionAssignment.GetClassSectionAssignmentByIdAsync(int classroomId)
        {
            throw new NotImplementedException();
        }
    }
}
