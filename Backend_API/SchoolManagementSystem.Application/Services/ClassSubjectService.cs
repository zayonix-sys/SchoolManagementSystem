using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class ClassSubjectService : IClassSubject
    {
        private readonly IGenericRepository<ClassSubject> _classSubjectRepository;
        private readonly ClassSubjectMapper _mapper;

        public ClassSubjectService(IGenericRepository<ClassSubject> genericRepository, ClassSubjectMapper classSubjectMapper)
        {
            _classSubjectRepository = genericRepository;
            _mapper = classSubjectMapper;

        }

        public async Task AddClassSubjectAsync(ClassSubjectAssignmentDTO classsubject)
        {
            try
            {

                var model = _mapper.MapToEntity(classsubject);
                await _classSubjectRepository.AddAsync(model);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task DeleteClassSubjectAsync(int classsubjectId)
        {
            var result = await _classSubjectRepository.GetByIdAsync(classsubjectId);
            if (result != null)
            {
                result.IsActive = false;
                await _classSubjectRepository.UpdateAsync(result);
            }
        }

        public async Task<List<ClassSubjectAssignmentDTO>> GetAllClassSubjectAsync()
        {
            var classAssignment = await _classSubjectRepository.GetAllAsync();
            var activeClasssubjects = classAssignment.Where(c => c.IsActive);

            // Map the entities to DTOs
            var classSubjectAssignmentDtos = activeClasssubjects.Select(c => _mapper.MapToDto(c)).ToList();

            return classSubjectAssignmentDtos;
        }

        public async Task UpdateClassSubjectAsync(ClassSubjectAssignmentDTO classsubject)
        {
            var model = _mapper.MapToEntity(classsubject);
            
            await _classSubjectRepository.UpdateAsync(model);
        }


        Task<ClassSubject> IClassSubject.GetClassSubjectByIdAsync(int classsubjectId)
        {
            throw new NotImplementedException();
        }
    }
}
