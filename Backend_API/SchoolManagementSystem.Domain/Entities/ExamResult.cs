using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementSystem.Domain.Entities
{
    public class ExamResult
    {
        [Key]
        public int ExamResultId { get; set; }

        [ForeignKey("Student")]
        public int StudentId { get; set; }

        [ForeignKey("ExamPaper")]
        public int? ExamPaperId { get; set; }

        [Required]
        public int? MarksObtained { get; set; }

        [Required]
        public int? TotalMarksObtained { get; set; }

        [Required]
        public decimal? Percentage { get; set; }

        [Required]
        public string? Grade { get; set; }

        [ForeignKey("CreatedUser")]
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        [ForeignKey("UpdatedUser")]
        public int? UpdatedBy { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        // Navigation properties
        public Student? Student { get; set; }
        public ExamPaper? ExamPaper { get; set; }
        public User? CreatedUser { get; set; }
        public User? UpdatedUser { get; set; }
    }
}
