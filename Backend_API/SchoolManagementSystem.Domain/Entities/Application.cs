using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Domain.Entities
{
    public class Application
    {
        [Key]
        public int ApplicationId { get; set; }

        [Required]
        public int ApplicantId { get; set; }

        [Required]
        public int ClassId { get; set; }

        [Required]
        public int SectionId { get; set; }

        [Required]
        [MaxLength(50)]
        public string ApplicationStatus { get; set; }  // e.g., "Pending", "Approved", "Rejected"

        public DateTime? AdmissionDecisionDate { get; set; }

        [MaxLength(255)]
        public string Remarks { get; set; }

        // Navigation Properties
        [ForeignKey("ApplicantId")]
        public virtual Applicant Applicant { get; set; }

        [ForeignKey("ClassId")]
        public virtual Class Class { get; set; }

        [ForeignKey("SectionId")]
        public virtual Section Section { get; set; }

        public virtual ICollection<AdmissionTest> AdmissionTests { get; set; }
        public virtual ICollection<Admission> Admissions { get; set; }
    }
}
