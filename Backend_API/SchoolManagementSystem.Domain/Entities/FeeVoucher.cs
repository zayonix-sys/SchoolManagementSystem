using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementSystem.Domain.Entities
{
    public class FeeVoucher
    {
        [Key]
        public int FeeVoucherId { get; set; }

        [ForeignKey("Student")]
        public int StudentId { get; set; }

        [ForeignKey("Campus")]
        public int CampusId { get; set; }

        [StringLength(50)]
        public string FeeMonth { get; set; }

        [StringLength(50)]
        public int FeeYear { get; set; }

        [StringLength(100)]
        public int TotalAmount { get; set; }

        [StringLength(100)]
        public DateTime DueDate { get; set; }

        [StringLength(10)]
        public bool Paid { get; set; }

        [StringLength(100)]
        public DateTime PaymentDate { get; set; }

        [StringLength(50)]
        public int LateFee { get; set; }
      
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int? CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public int? UpdatedBy { get; set; }

        public bool IsActive { get; set; } = true;

        // Navigation Property
        public Student? Student { get; set; }

        public Campus? Campus { get; set; }

    }
}
