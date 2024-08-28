
using SchoolManagementSystem.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementSystem.Application.DTOs
{
    public class ApplicantDTO
    {
        public int ApplicantId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FormBNumber { get; set; }
        public DateTime DateOfBirth { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string? Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ApplicantAddress { get; set; }
        public string Nationality { get; set; }
        public DateTime ApplicationDate { get; set; } = DateTime.Now;
        public string Languages { get; set; }
        public string ResidenceStatus { get; set; }
        public string States { get; set; }
        public string City { get; set; }
        // Navigation property
        public int LastClassId { get; set; }
        public int AdmissionClassId { get; set; }
    }
}
