using Microsoft.EntityFrameworkCore;
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

        //public async Task AddClassSubjectAsync(ClassSubjectAssignmentDTO classsubject)
        //{
        //    try
        //    {

        //        var model = _mapper.MapToEntity(classsubject);
        //        await _classSubjectRepository.AddAsync(model);

        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}
        //
        public async Task AddClassSubjectAsync(ClassSubjectAssignmentDTO classsubject)
        {
            try
            {
                //var existingEntity = await _classSubjectRepository.GetByIdAsync(classsubject.ClassId);

                //if (existingEntity != null)
                //{
                //    var existingSubjectIds = existingEntity.SubjectId?.Split(',').Select(int.Parse).ToList() ?? new List<int>();
                //    var newSubjectIds = classsubject.SubjectIds.Except(existingSubjectIds).ToList();

                //    if (!newSubjectIds.Any())
                //    {
                //        throw new Exception("All subjects are already assigned to this class.");
                //    }

                //    existingSubjectIds.AddRange(newSubjectIds);
                //    existingEntity.SubjectId = string.Join(",", existingSubjectIds);
                //    existingEntity.UpdatedAt = DateTime.Now;
                //    existingEntity.UpdatedBy = classsubject.UpdatedBy;

                //    await _classSubjectRepository.UpdateAsync(existingEntity);
                //}
                //else
                //{
                //    var entity = _mapper.MapToEntity(classsubject);
                //    await _classSubjectRepository.AddAsync(entity);
                //}

                var entities = _mapper.MapToEntities(classsubject);

                foreach (var entity in entities)
                {
                    var existingEntities = await _classSubjectRepository.GetAllAsync(
                        cs => cs.ClassId == entity.ClassId && cs.SubjectId == entity.SubjectId
                    );

                    if (existingEntities != null && existingEntities.Any())
                    {
                        throw new Exception("Subject already assigned to this class.");
                    }

                    await _classSubjectRepository.AddAsync(entity);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding class subjects.", ex);
            }
        }

        public async Task UpdateClassSubjectAsync(ClassSubjectAssignmentDTO classsubject)
        {
            try
            {
                var existingEntities = await _classSubjectRepository.GetAllAsync(cs => cs.ClassId == classsubject.ClassId);

                foreach (var existingEntity in existingEntities)
                {
                    await _classSubjectRepository.DeleteAsync(existingEntity);
                }

                var entities = _mapper.MapToEntities(classsubject);
                foreach (var entity in entities)
                {
                    await _classSubjectRepository.AddAsync(entity);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating class subjects.", ex);
            }
        }


        public async Task DeleteClassSubjectAsync(int classId)
        {

            var existingEntities = await _classSubjectRepository.GetAllAsync(cs => cs.ClassId == classId);

            foreach (var existingEntity in existingEntities)
            {
                existingEntity.IsActive = false;
                await _classSubjectRepository.UpdateAsync(existingEntity);
            }
            //var result = await _classSubjectRepository.GetByIdAsync(classsubjectId);
            //if (result != null)
            //{
            //    result.IsActive = false;
            //    await _classSubjectRepository.UpdateAsync(result);
            //}
        }

        public async Task<List<ClassSubjectAssignmentDTO>> GetAllClassSubjectAsync()
        {
            var classAssignment = await _classSubjectRepository.GetAllAsync(
                include: query => query
                .Include(s => s.Subject)
                .Include(s => s.Class)
                );
            var activeClasssubjects = classAssignment.Where(c => c.IsActive);

            // Map the entities to DTOs
            var classSubjectAssignmentDtos = activeClasssubjects.Select(c => _mapper.MapToDto(c)).ToList();

            return classSubjectAssignmentDtos;
        }


        Task<ClassSubject> IClassSubject.GetClassSubjectByIdAsync(int classsubjectId)
        {
            throw new NotImplementedException();
        }
    }
}
