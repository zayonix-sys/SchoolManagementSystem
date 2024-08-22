using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/campuses")]
    public class CampusesController : ControllerBase
    {
        private readonly ILogger<CampusesController> _logger;
        private readonly ICampuses _campusService;
        

        public CampusesController(ILogger<CampusesController> logger, ICampuses campus)
        {
            _logger = logger;
            _campusService = campus;
            
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<CampusDTO>>> GetCampuses()
        {
            _logger.LogInformation("Fetching all Campuses.");
            try
            {
                var campuses = await _campusService.GetAllCampusesAsync();
                _logger.LogInformation("Successfully retrieved {Count} campuses.", campuses?.Count() ?? 0);

                return Ok(campuses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all Campuses.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<Campus>> GetCampusById(int id)
        {
            _logger.LogInformation("Fetching student with ID {CampusId}.", id);
            try
            {
                var campus = await _campusService.GetCampusByIdAsync(id);
                if (campus == null)
                {
                    _logger.LogWarning("Student with ID {campusId} not found.", id);
                    return NotFound();
                }

                _logger.LogInformation("Successfully retrieved campus with ID {campusId}.", id);
                return Ok(campus);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching campus with ID {campusId}.", id);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<Campus>> AddCampus([FromBody] CampusDTO dto)
        {
            _logger.LogInformation("Adding a new Campus with name {CampusName}.", dto.CampusName);
            try
            {
                await _campusService.AddCampusAsync(dto);
                _logger.LogInformation("Successfully added campus with ID {campusId}.", dto.CampusId);
                return CreatedAtAction(nameof(GetCampuses), new { id = dto.CampusId }, dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new campus.");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateCampus(int id, CampusDTO campus)
        {
            if (id != campus.CampusId)
            {
                _logger.LogWarning("Campus ID mismatch: {Id} does not match {CampusId}.", id, campus.CampusId);
                return BadRequest("Campus ID mismatch.");
            }

            _logger.LogInformation("Updating Campus with ID {CampusId}.", id);
            try
            {
                await _campusService.UpdateCampusAsync(id, campus);
                _logger.LogInformation("Successfully updated campus with ID {CampusId}.", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating Campus with ID {CampusId}.", id);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteCampus(int id)
        {
            _logger.LogInformation("Deleting student with ID {CampusId}.", id);
            try
            {
                await _campusService.DeleteCampusAsync(id);
                _logger.LogInformation("Successfully deleted Campus with ID {CampusId}.", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting Campus with ID {CampusId}.", id);
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
