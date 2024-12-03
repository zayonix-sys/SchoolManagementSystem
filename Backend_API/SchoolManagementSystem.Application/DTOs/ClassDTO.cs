namespace SchoolManagementSystem.Application.DTOs
{
    public class ClassDto
    {
        public int? ClassId { get; set; }
        public string ClassName { get; set; }
        public string? ClassDescription { get; set; }
        public int Capacity { get; set; }
        public int? CreatedBy { get; set; } = 2;
        public int? UpdatedBy { get; set; }
        public bool IsActive { get; set; } = true;



    }
}
