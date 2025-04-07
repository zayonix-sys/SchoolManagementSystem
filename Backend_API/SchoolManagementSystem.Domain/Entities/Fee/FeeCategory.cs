namespace SchoolManagementSystem.Domain.Entities.Fee
{
    public class FeeCategory
    {
        public int FeeCategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UpdatedBy { get; set; }
        public bool IsActive { get; set; }
    }
}
