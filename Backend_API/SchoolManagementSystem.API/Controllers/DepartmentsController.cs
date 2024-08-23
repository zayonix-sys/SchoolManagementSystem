using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartments _departmentService;
        private readonly ILogger<CampusesController> _logger;

        public DepartmentsController(ILogger<CampusesController> logger, IDepartments department)
        {
            _logger = logger;
            _departmentService = department;
        }

        [HttpGet("GetDepartments/{campusId}")]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments(int campusId)
        {
            _logger.LogInformation("Fetching all Departments.");
            try
            {
                var departments = await _departmentService.GetAllDepartmentsWithCampusAsync(campusId);
                _logger.LogInformation("Successfully retrieved {Count} departments.", departments?.Count() ?? 0);

                return Ok(departments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all Departments.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<Department>> GetDepartmentById(int id)
        {
            _logger.LogInformation("Fetching Department with ID {DepartmentId}.", id);
            try
            {
                var campus = await _departmentService.GetDepartmentByIdAsync(id);
                if (campus == null)
                {
                    _logger.LogWarning("Department with ID {DepartmentId} not found.", id);
                    return NotFound();
                }

                _logger.LogInformation("Successfully retrieved Department with ID {DepartmentId}.", id);
                return Ok(campus);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching campus with ID {DepartmentId}.", id);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<Department>> AddDepartment(Department department)
        {
            _logger.LogInformation("Adding a new Department with name {DepartmentName}.", department.DepartmentName);
            try
            {
                await _departmentService.AddDepartmentAsync(department);
                _logger.LogInformation("Successfully added department with ID {departmentId}.", department.DepartmentId);
                return CreatedAtAction(nameof(GetDepartments), new { id = department.DepartmentId }, department);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new department.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateDepartment(int id, Department department)
        {
            if (id != department.DepartmentId)
            {
                _logger.LogWarning("Department ID mismatch: {Id} does not match {departmentId}.", id, department.DepartmentId);
                return BadRequest("Department ID mismatch.");
            }

            _logger.LogInformation("Updating Campus with ID {CampusId}.", id);
            try
            {
                await _departmentService.UpdateDepartmentAsync(id, department);
                _logger.LogInformation("Successfully updated Department with ID {DepartmentId}.", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating Department with ID {DepartmentId}.", id);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            _logger.LogInformation("Deleting Department with ID {DepartmentId}.", id);
            try
            {
                await _departmentService.DeleteDepartmentAsync(id);
                _logger.LogInformation("Successfully deleted Department with ID {DepartmentId}.", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting Department with ID {DepartmentId}.", id);
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
