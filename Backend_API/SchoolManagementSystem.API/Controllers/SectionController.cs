using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.API.Models;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SectionController : ControllerBase
    {
        private readonly ISection _sectionService;
        private readonly ILogger<SectionController> _logger;

        public SectionController(ILogger<SectionController> logger, ISection sec)
        {
            _logger = logger;
            _sectionService = sec;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Section>>> GetSection()
        {
            _logger.LogInformation("Fetching all sections.");
            try
            {
                var sec = await _sectionService.GetAllSectionAsync();
                _logger.LogInformation("Successfully retrieved {Count} section.", sec?.Count() ?? 0);

                return Ok(sec);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all section.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Section>> GetSection(int id)
        {
            _logger.LogInformation("Fetching sections with ID {SectionId}.", id);
            try
            {
                var sec = await _sectionService.GetSectionByIdAsync(id);
                if (sec == null)
                {
                    _logger.LogWarning("section with ID {SectionId} not found.", id);
                    return NotFound();
                }

                _logger.LogInformation("Successfully retrieved section with ID {SectionId}.", id);
                return Ok(sec);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching section with ID {SectionId}.", id);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Section>> AddSection(Section sec)
        {
            _logger.LogInformation("Adding a new section with name {SectionName}.", sec.SectionName);
            try
            {
                await _sectionService.AddSectionAsync(sec);
                _logger.LogInformation("Successfully added section with ID {SectionId}.", sec.SectionId);
                return CreatedAtAction(nameof(GetSection), new { id = sec.SectionId }, sec);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new section.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateSection(Section sec)
        {
            
                _logger.LogWarning("Section ID mismatch: {Id} does not match {SectionId}.", sec.SectionId);
            try
            {
                await _sectionService.UpdateSectionAsync(sec);
                _logger.LogInformation("Successfully updated Section with ID {SectionId}.", sec.SectionId);
                return Ok(ApiResponse<Section>.SuccessResponse(sec, "Section updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating Section with ID {SectionId}.", sec.SectionId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteSection(int id)
        {
            _logger.LogInformation("Deleting section with ID {SectionId}.", id);
            try
            {
                await _sectionService.DeleteSectionAsync(id);
                _logger.LogInformation("Successfully deleted Section with ID {SectionId}.", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting section with ID {SectionId}.", id);
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
