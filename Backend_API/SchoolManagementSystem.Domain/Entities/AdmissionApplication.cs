using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Domain.Entities
{
    [Table("Applications")]
    public class AdmissionApplication
    {

        [Key]
        public int ApplicationId { get; set; }

        public int ApplicantId { get; set; }
        [ForeignKey(nameof(ApplicantId))]
        public virtual Applicant Applicant { get; set; }

        public int? CampusId { get; set; }
        [ForeignKey(nameof(CampusId))]
        public virtual Campus Campus { get; set; }

        public int? ClassId { get; set; }
        [ForeignKey(nameof(ClassId))]
        public virtual Class Class { get; set; }

        [MaxLength(50)]
        public string? ApplicationStatus { get; set; } = "Pending";

        public DateTime? AdmissionDecisionDate { get; set; }

        [MaxLength(255)]
        public string? Remarks { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.Now;

        public int? CreatedBy { get; set; }
        [ForeignKey(nameof(CreatedBy))]
        public virtual User CreatedByUser { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public int? UpdatedBy { get; set; }
        [ForeignKey(nameof(UpdatedBy))]
        public virtual User UpdatedByUser { get; set; }

        public bool? IsActive { get; set; } = true;
    }
}
