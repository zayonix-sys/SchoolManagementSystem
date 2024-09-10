using Microsoft.EntityFrameworkCore;
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
                var assignments = await _classSectionAssignmentRepository.GetAllAsync(
                    include: query => query
                    .Include(a => a.Classroom)
                    .Include(a => a.Class)
                    .Include(a => a.Section)
                    .Include(a => a.Campus)
                    );

                var classroomAssignments = assignments.Where(a =>
                    a.Classroom.ClassroomId == classroom.ClassroomId &&   
                    a.Campus.CampusId == classroom.CampusId &&          
                    a.IsActive).ToList();
              
                if (classroomAssignments != null)
                {
                    var classroomCapacity = assignments
                    .Where(a => a.Classroom.ClassroomId == classroom.ClassroomId)
                    .Select(a => a.Classroom.Capacity)
                    .FirstOrDefault();

                    var totalSectionCapacity = classroomAssignments.Sum(s => s.Section.Capacity);

                    if (classroomCapacity <= totalSectionCapacity)
                    {
                        throw new Exception("Classroom capacity exceeded. Cannot assign more sections.");
                    }
                    else
                    {
                        var model = _mapper.MapToEntity(classroom);
                        await _classSectionAssignmentRepository.AddAsync(model);
                    }

                }

            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while processing the class section assignment.", ex);
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
            var classAssignment = await _classSectionAssignmentRepository.GetAllAsync(
                include: query => query
                .Include(cl => cl.Classroom)
                .Include(c => c.Class)
                .Include(s => s.Section)
                .Include(s => s.Campus),
                filter: c => c.IsActive);

            var classAssignmentDtos = classAssignment.Select(c => _mapper.MapToDto(c)).ToList();

            return classAssignmentDtos;
        }

        public async Task UpdateClassSectionAssignmentAsync(ClassSectionAssignmentDTO classroom)
        {
            try
            {
                // Retrieve all existing assignments
                var assignments = await _classSectionAssignmentRepository.GetAllAsync();

                // Check if the same classroom already exists in the same campus
                var existingClassroom = assignments
                    .Where(a => a.IsActive &&
                                a.CampusId == classroom.CampusId &&
                                a.ClassroomId == classroom.ClassroomId &&
                                a.AssignmentId != classroom.AssignmentId) 
                    .FirstOrDefault();
                if (existingClassroom != null)
                {
                    throw new Exception("This Classroom is already assigned within this Campus.");
                }

                // Check if the same class with the same section already exists in any classroom within the same campus
                var existingClassAndSection = assignments
                    .Where(a => a.IsActive &&
                                a.CampusId == classroom.CampusId &&
                                a.ClassId == classroom.ClassId &&
                                a.SectionId == classroom.SectionId &&
                                a.AssignmentId != classroom.AssignmentId) 
                    .FirstOrDefault();
                if (existingClassAndSection != null)
                {
                    throw new Exception("This Class with the same Section is already assigned to another Classroom in this Campus.");
                }

                // Check if the same class is already assigned in a different section within the same campus
                var existingClassDifferentSection = assignments
                    .Where(a => a.IsActive &&
                                a.CampusId == classroom.CampusId &&
                                a.ClassId == classroom.ClassId &&
                                a.ClassroomId != classroom.ClassroomId)
                    .FirstOrDefault();
                if (existingClassDifferentSection != null && existingClassDifferentSection.SectionId == classroom.SectionId)
                {
                    throw new Exception("This Class with the same Section is already assigned to a different Classroom in this Campus.");
                }

                // Retrieve the existing entity to update it
                var existingAssignment = assignments.FirstOrDefault(a => a.AssignmentId == classroom.AssignmentId);

                if (existingAssignment == null)
                {
                    throw new Exception("The assignment does not exist.");
                }

                // Map the DTO to the existing entity
                existingAssignment.CampusId = classroom.CampusId;
                existingAssignment.ClassId = classroom.ClassId;
                existingAssignment.SectionId = classroom.SectionId;
                existingAssignment.ClassroomId = classroom.ClassroomId;
                existingAssignment.IsActive = classroom.IsActive;

                // Re-add the modified entity 
                await _classSectionAssignmentRepository.AddAsync(existingAssignment);
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while updating the class section assignment.", ex);
            }
        }

        Task<ClassSectionAssignment> IClassSectionAssignment.GetClassSectionAssignmentByIdAsync(int classroomId)
        {
            throw new NotImplementedException();
        }
    }
}
