using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.API.Models;
using SchoolManagementSystem.Application.Services;

namespace SchoolManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicantController : ControllerBase
    {
        private readonly IApplicant _applicantService;
        private readonly ILogger<ApplicantController> _logger;

        public ApplicantController(ILogger<ApplicantController> logger, IApplicant applicant)
        {
            _logger = logger;
            _applicantService = applicant;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Applicant>>> GetAllApplicants()
        {
            _logger.LogInformation("Fetching all applicants.");
            try
            {
                var applicants = await _applicantService.GetAllApplicantsAsync();
                _logger.LogInformation("Successfully retrieved {Count} applicants.", applicants?.Count() ?? 0);

                return Ok(applicants);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all classrooms.");
                return StatusCode(500, "Internal server error.");
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Applicant>> GetApplicantById(int appId)
        {
            _logger.LogInformation("Fetching applicant with Id {ApplicantId}.", appId);
            try
            {
                var applicants = await _applicantService.GetApplicantByIdAsync(appId);
                if (applicants == null)
                {
                    _logger.LogWarning("Applicant with Id {ApplicantId} not found.", appId);
                    return NotFound();
                }

                _logger.LogInformation("Successfully retrieved Applicant with Id {ApplicantId}.", appId);
                return Ok(applicants);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching applicant with Id {ApplicantId}.", appId);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<ApplicantDTO>>> AddApplicant([FromBody] ApplicantAdmissionDTO dto)
        {
            _logger.LogInformation("Adding a new Applicant with name {FirstName}.", dto.FirstName);
            try
            {
                var applicantId = await _applicantService.AddApplicantAsync(dto);
                await _applicantService.AddAdmissionApplicationAsync(dto, applicantId);
                _logger.LogInformation("Successfully added applicant with ID {ApplicantId}.", dto.ApplicantId);
                return Ok(ApiResponse<ApplicantAdmissionDTO>.SuccessResponse(dto, "Applicant added successfully"));

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new applicant.");
                return StatusCode(500, ApiResponse<ApplicantDTO>.ErrorResponse("Internal server error."));
            }
        }

        //[HttpPut("{appId}")]
        //public async Task<IActionResult> UpdateApplicant(Applicants app)
        //{
        //    if (appId != app.ApplicantId)
        //    {
        //        _logger.LogWarning("Applicant ID mismatch: {Id} does not match {ApplicantId}.", app.ApplicantId);
        //        return BadRequest("Classroom ID mismatch.");
        //    }

        //    _logger.LogInformation("Updating applicant with ID {ApplicantId}.", app);
        //    try
        //    {
        //        await _applicantService.UpdateApplicantAsync(app);
        //        _logger.LogInformation("Successfully updated applicant with ID {ApplicantId}.", app);
        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "An error occurred while updating applicant with ID {ApplicantId}.", app);
        //        return StatusCode(500, "Internal server error.");
        //    }
        //}

        [HttpDelete("{appId}")]
        public async Task<IActionResult> DeleteApplicant(int appId)
        {
            _logger.LogInformation("Deleting applicant with ID {ApplicantId}.", appId);
            try
            {
                await _applicantService.DeleteApplicantAsync(appId);
                _logger.LogInformation("Successfully deleted applicant with ID {ApplicantId}.", appId);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting applicant with ID {ApplicantId}.", appId);
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
