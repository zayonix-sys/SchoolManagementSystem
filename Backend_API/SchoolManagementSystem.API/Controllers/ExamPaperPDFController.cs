using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.API.Models;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Services;
using SchoolManagementSystem.Domain.Entities;

[ApiController]
[Route("api/ExamPaperPDF")]
public class ExamPaperPDFController : ControllerBase
{
    private readonly ILogger<ExamPaperPDFController> _logger;
    private readonly IExamPaperPDF _examPaperPDFService;
    private readonly IExamPaper _examPaperService;

    public ExamPaperPDFController(ILogger<ExamPaperPDFController> logger, IExamPaperPDF examPaperPDF, IExamPaper examPaperService)
    {
        _logger = logger;
        _examPaperPDFService = examPaperPDF;
        _examPaperService = examPaperService;
    }

    //[HttpGet("[action]/{examPaperId}")]
    //public async Task<ActionResult<ApiResponse<byte[]>>> GeneratePdf(int examPaperId)
    //{
    //    _logger.LogInformation("Generating PDF for Exam Paper with ID {ExamPaperId}.", examPaperId);
    //    try
    //    {
    //        var examPaper =  _examPaperPDFService.GeneratePdf(new ExamPaperDTO { ExamPaperId = examPaperId });

    //        _logger.LogInformation("Successfully generated PDF for Exam Paper ID {ExamPaperId}.", examPaperId);
    //        return Ok(ApiResponse<byte[]>.SuccessResponse(examPaper, "PDF generated successfully."));
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while generating PDF for Exam Paper ID {ExamPaperId}.", examPaperId);
    //        return StatusCode(500, ApiResponse<byte[]>.ErrorResponse("Internal server error."));
    //    }
    //}



    //[HttpGet("preview/{examPaperId}")]
    //public async Task<IActionResult> PreviewPdf(ExamPaperDTO examPaper)
    //{
    //    // Fetch the exam paper details using the examPaperId
    //    var examPapers = await _examPaperService.GetAllExamPapersAsync(); // Assuming you have a service method to get exam paper details

    //    if (examPapers == null)
    //    {
    //        return NotFound(ApiResponse<object>.ErrorResponse("Exam paper not found.")); // Handle not found case
    //    }
    //    // Call the preview method
    //    _examPaperPDFService.PreviewPdf(examPaper);

    //    // Return a success response indicating that the PDF is being previewed
    //    return Ok(ApiResponse<object>.SuccessResponse(null, "PDF preview initiated successfully."));
    //}



    [HttpGet("[action]")]
    public async Task<IActionResult> GeneratePdf(int classId, int subjectId)
    {
        _logger.LogInformation("Generating PDF for Exam Paper with ClassId {ClassId}.", classId, subjectId);

        try
        {
            var pdfBytes = await _examPaperPDFService.GeneratePdf(classId, subjectId); // Make sure the service method is async
            _logger.LogInformation("Successfully generated PDF for ClassId {ClassId}.", classId, subjectId);
            return File(pdfBytes, "application/pdf", $"ExamPaper_{classId}.pdf");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while generating PDF for ClassId {ClassId}.", classId, subjectId);
            return StatusCode(500, "Internal server error.");
        }
    }


}
