
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementSystem.Domain.Entities
{
    public class Parents
    {
        [Key]
        public int ParentId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FullName { get; set; }

        [MaxLength(50)]
        public string ParentEmail { get; set; }

        [Required]
        [MaxLength(15)]
        public string ParentPhoneNumber { get; set; }

        [Required]
        [MaxLength(255)]
        public string ParentAddress { get; set; }

        [Required]
        [MaxLength(50)]
        public string RelationWithApplicant { get; set; }

        [MaxLength(50)]
        public string Qualification { get; set; }

        [Required]
        [MaxLength(50)]
        public string Occupation { get; set; }

        [Required]
        [MaxLength(50)]
        public string SourceOfIncome { get; set; }

        // Navigation Properties
        [ForeignKey("ApplicantId")]
        public virtual Applicants Applicant { get; set; }
    }
}
