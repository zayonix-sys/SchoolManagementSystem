
using SchoolManagementSystem.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementSystem.Application.DTOs
{
    public class ApplicantDTO
    {
        public int ApplicantId { get; set; }
        public int? LastClassId { get; set; }
        public int? AdmissionClassId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FormBNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ApplicantAddress { get; set; }
        public string ResidenceStatus { get; set; }
        public string City { get; set; }
        public string MotherTounge { get; set; }
        public string States { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public bool? IsActive { get; set; }
    }
}
