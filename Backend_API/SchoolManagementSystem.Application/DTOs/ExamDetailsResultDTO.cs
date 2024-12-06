
namespace SchoolManagementSystem.Application.DTOs
{
    public class ExamDetailsResultDTO
    {
        public int ExamResultId { get; set; }
        public int? ExamPaperId { get; set; }
        public int StudentId { get; set; }
        public int? MarksObtained { get; set; }
        public int? TotalMarksObtained { get; set; }
        public decimal? Percentage { get; set; }
        public string? Grade { get; set; }
    }
}
