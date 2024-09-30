using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.API.Models;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly IStudent _studentService;
        private readonly ILogger<StudentsController> _logger;

        public StudentsController(ILogger<StudentsController> logger, IStudent student)
        {
            _logger = logger;
            _studentService = student;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            _logger.LogInformation("Fetching all students.");
            try
            {
                var students = await _studentService.GetAllStudentAsync();
                _logger.LogInformation("Successfully retrieved {Count} students.", students?.Count() ?? 0);

                return Ok(ApiResponse<IEnumerable<Student>>.SuccessResponse(students, "students retrieved successfully"));

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all students.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("[action]")]

        public async Task<ActionResult<IEnumerable<StudentDTO>>> GetStudentsClassWise(int classId)
        {
            _logger.LogInformation("Fetching all students.");
            try
            {
                var students = await _studentService.GetAllStudentClassWiseAsync(classId);
                _logger.LogInformation("Successfully retrieved {Count} students.", students?.Count() ?? 0);
                return Ok(ApiResponse<IEnumerable<StudentDTO>>.SuccessResponse(students, "student with class retrieved successfully"));


            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all students.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDTO>> GetStudent(int id)
        {
            _logger.LogInformation("Fetching student with ID {StudentId}.", id);
            try
            {
                var student = await _studentService.GetStudentByIdAsync(id);
                if (student == null)
                {
                    _logger.LogWarning("Student with ID {StudentId} not found.", id);
                    return NotFound();
                }

                _logger.LogInformation("Successfully retrieved student with ID {StudentId}.", id);
                return Ok(student);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching student with ID {StudentId}.", id);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Student>> AddStudent(Student student)
        {
            _logger.LogInformation("Adding a new student with name {FirstName} {LastName}.", student.FirstName, student.LastName);
            try
            {
                await _studentService.AddStudentAsync(student);
                _logger.LogInformation("Successfully added student with ID {StudentId}.", student.StudentId);
                return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, student);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new student.");
                return StatusCode(500, "Internal server error.");
            }
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateStudent(Student student)
        //{


        //        _logger.LogWarning("Student ID mismatch: {Id} does not match {StudentId}.", student.StudentId);
        //        return BadRequest("Student ID mismatch.");


        //    _logger.LogInformation("Updating student with ID {StudentId}.", id);
        //    try
        //    {
        //        await _studentService.UpdateStudentAsync(student);
        //        _logger.LogInformation("Successfully updated student with ID {StudentId}.", id);
        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "An error occurred while updating student with ID {StudentId}.", id);
        //        return StatusCode(500, "Internal server error.");
        //    }
        //}

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            _logger.LogInformation("Deleting student with ID {StudentId}.", id);
            try
            {
                await _studentService.DeleteStudentAsync(id);
                _logger.LogInformation("Successfully deleted student with ID {StudentId}.", id);
                return Ok(ApiResponse<object>.SuccessResponse(null, "Student deleted successfully"));

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting student with ID {StudentId}.", id);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));

            }
        }
    }
}
