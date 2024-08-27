
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
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string? Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ApplicantAddress { get; set; }
        public string Nationality { get; set; }
        public DateTime ApplicationDate { get; set; } = DateTime.Now;
        public string LastClassAttended { get; set; }
        public string AdmissionRequiredInClass { get; set; }
        public string Languages { get; set; }
        public string ResidenceStatus { get; set; }
        public string States { get; set; }
        public string City { get; set; }
        public int? ParentId { get; set; }
        // Navigation property
        public Parents Parents { get; set; }
        //public string FullName { get; set; }
        //public string? ParentEmail { get; set; }
        //public string ParentPhoneNumber { get; set; }
        //public string ParentAddress { get; set; }
        //public string RelationWithApplicant { get; set; }
        //public string? Qualification { get; set; }
        //public string Occupation { get; set; }
        //public string SourceOfIncome { get; set; }

    }
}
