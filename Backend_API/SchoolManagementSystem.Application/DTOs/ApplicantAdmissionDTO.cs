using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.DTOs
{
    public class ApplicantAdmissionDTO
    {
        // Applicant Details
        public int ApplicantId { get; set; }
        public int? LastClassId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FormBNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ApplicantAddress { get; set; }
        public string? ResidenceStatus { get; set; }
        public string? City { get; set; }
        public string? MotherTounge { get; set; }
        public string? States { get; set; }

        // Application Details
        public int ApplicationId { get; set; }
        public int? CampusId { get; set; }
        public int? AdmissionClassId { get; set; }
        public string? ApplicationStatus { get; set; } = "Pending";
        public DateTime? AdmissionDecisionDate { get; set; }
        public string? Remarks { get; set; }

        // Common Fields
        public DateTime? CreatedAt { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public bool IsActive { get; set; } = true;
        public string? LastAttendedClass { get; set; }
        public string? ClassForAdmission { get; set; }
        public string? CampusName { get; set; }
    }
}
