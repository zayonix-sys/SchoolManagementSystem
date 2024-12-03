﻿using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.API.Models;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;


[ApiController]
[Route("api/ExamResults")]
public class ExamResultController : ControllerBase
{
    private readonly ILogger<ExamResultController> _logger;
    private readonly IExamResult _examResultService;

    public ExamResultController(ILogger<ExamResultController> logger, IExamResult examResult)
    {
        _logger = logger;
        _examResultService = examResult;
    }



    [HttpGet("[action]")]
    public async Task<ActionResult<ApiResponse<IEnumerable<ExamResultDTO>>>> GetAllExamsResults()
    {
        _logger.LogInformation("Fetching all Exams Results.");
        try
        {
            var exams = await _examResultService.GetAllExamResultsAsync();
            _logger.LogInformation("Successfully retrieved {Count} All Exams Results.", exams?.Count() ?? 0);

            return Ok(ApiResponse<IEnumerable<ExamResultDTO>>.SuccessResponse(exams, "Exams Results retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching Exams Results.");
            return StatusCode(500, ApiResponse<IEnumerable<ExamResultDTO>>.ErrorResponse("Internal server error."));
        }
    }

    [HttpPost("[action]")]
    public async Task<ActionResult<ApiResponse<ExamResultDTO>>> AddExamResults([FromBody] ExamResultDTO dto)
    {
        _logger.LogInformation("Adding a new ExamResult with Id {ResultId}.", dto.ExamResultId);
        try
        {
            await _examResultService.AddExamResultAsync(dto);
            _logger.LogInformation("Successfully added Exam Result with ID {ResultId}.", dto.ExamResultId);
            return Ok(ApiResponse<ExamResultDTO>.SuccessResponse(dto, "Exam Result added successfully"));

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while adding a new Exam Result.");
            return StatusCode(500, ApiResponse<ExamResultDTO>.ErrorResponse("Internal server error."));
        }
    }

    [HttpPut("[action]")]
    public async Task<IActionResult> UpdateExamResult([FromBody] ExamResultDTO dto)
    {
        _logger.LogInformation("Updating Exam Result with ID {ResultId}.", dto.ExamResultId);
        try
        {
            await _examResultService.UpdateExamResultAsync(dto);
            _logger.LogInformation("Successfully updated Exam Result with ID {ResultId}.", dto.ExamResultId);
            return Ok(ApiResponse<ExamResultDTO>.SuccessResponse(dto, "Exam Result updated successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating Exam Result with ID {ResultId}.", dto.ExamResultId);
            return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
        }
    }

    [HttpDelete("[action]")]
    public async Task<IActionResult> DeleteExamResult(int examResultId)
    {
        _logger.LogInformation("Deleting Exam Result with ID {ResultId}.", examResultId);
        try
        {
            await _examResultService.DeleteExamResultAsync(examResultId);
            _logger.LogInformation("Successfully deleted Exam Result with ID {ExamResultId}.", examResultId);
            return Ok(ApiResponse<object>.SuccessResponse(null, "Exam Result deleted successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting Exam Result with ID {ExamResultId}.", examResultId);
            return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
        }
    }
}
