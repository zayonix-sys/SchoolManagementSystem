
namespace SchoolManagementSystem.Application.DTOs
{
    public class ClassSectionAssignmentDTO
    {
        public int AssignmentId { get; set; }
        public int? ClassId { get; set; }
        public int? SectionId { get; set; }
        public int? ClassroomId { get; set; }
        //public int Capacity { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? CreatedBy { get; set; } = 2;
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
