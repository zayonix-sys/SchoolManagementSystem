﻿using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.API.Models;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;


namespace SchoolManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly ILogger<EmployeesController> _logger;
        private readonly IEmployees _employeeService;

        public EmployeesController(ILogger<EmployeesController> logger, IEmployees emp)
        {
            _logger = logger;
            _employeeService = emp;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<EmployeesDTO>>> GetEmployees()
        {
            _logger.LogInformation("Fetching all Employees.");
            try
            {
                var employees = await _employeeService.GetAllEmployeesAsync();
                _logger.LogInformation("Successfully retrieved {Count} employees.", employees?.Count() ?? 0);

                return Ok(ApiResponse<IEnumerable<EmployeesDTO>>.SuccessResponse(employees, "employees retrieved successfully"));

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all employees.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<EmployeesDTO>> GetEmployeeById(int employeeId)
        {
            _logger.LogInformation("Fetching employees with ID {employeeId}.", employeeId);
            try
            {
                var emp = await _employeeService.GetEmployeeByIdAsync(employeeId);
                if (emp == null)
                {
                    _logger.LogWarning("employee with ID {employeeId} not found.", employeeId);
                    return NotFound();
                }

                _logger.LogInformation("Successfully retrieved employee with ID {employeeId}.", employeeId);
                return Ok(emp);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching employee with ID {employeeId}.", employeeId);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<EmployeesDTO>>> AddEmployee([FromBody] EmployeesDTO emp)
        {
            _logger.LogInformation("Adding a new employee with name {employeeName}.", emp.FirstName);
            try
            {
                await _employeeService.AddEmployeeAsync(emp);
                _logger.LogInformation("Successfully added employee with ID {employeeId}.", emp.EmployeeId);
                return Ok(ApiResponse<EmployeesDTO>.SuccessResponse(emp, "employee Added Successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new employee.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdatEmployee(EmployeesDTO emp)
        {

            _logger.LogInformation("Updating Employee with ID .", emp.EmployeeId);
            try
            {
                await _employeeService.UpdateEmployeeAsync(emp);
                _logger.LogInformation("Successfully updated employee with ID employeeId.", emp.EmployeeId);
                return Ok(ApiResponse<EmployeesDTO>.SuccessResponse(emp, "employee updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating employee with ID {employeeId}.", emp.EmployeeId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteEmployee(int employeeId)
        {
            _logger.LogInformation("Deleting class with ID {employeeId}.", employeeId);
            try
            {
                await _employeeService.DeleteEmployeeAsync(employeeId);
                _logger.LogInformation("Successfully deleted employee with ID {employeeId}.", employeeId);
                return Ok(ApiResponse<object>.SuccessResponse(null, "employee deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting employee with ID {employeeId}.", employeeId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }
    }
}
