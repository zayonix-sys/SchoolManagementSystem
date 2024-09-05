using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.DTOs
{
    public class ApplicationDTO
    {
        public int ApplicationId { get; set; }
        public int? ApplicantId { get; set; }
        public int? CampusId { get; set; }
        public int? ClassId { get; set; }
        public string ApplicationStatus { get; set; }
        public DateTime? AdmissionDecisionDate { get; set; }
        public string? Remarks { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public virtual Applicant? Applicant { get; set; }
        public virtual Class? Class { get; set; }

        public virtual Campus? Campus { get; set; }
    }
}
