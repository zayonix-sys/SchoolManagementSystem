using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Domain.Entities
{
    public class Applicant
    {
        [Key]
        public int ApplicantId { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(100)]
        public string FormBNumber { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; } = DateTime.Now;

        [Required]
        [MaxLength(10)]
        public string Gender { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; }

        [Required]
        [MaxLength(15)]
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(255)]
        public string ApplicantAddress { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nationality { get; set; }

        [Required]
        public DateTime ApplicationDate { get; set; } = DateTime.Now;

        [ForeignKey("LastClassId")]
        public int LastClassAttended { get; set; }

        [ForeignKey("AdmissionClassId")]
        public int AdmissionRequiredInClass { get; set; }

        [Required]
        [MaxLength(100)]
        public string Languages { get; set; }

        [Required]
        [MaxLength(100)]
        public string ResidenceStatus { get; set; }

        [Required]
        [MaxLength(100)]
        public string States { get; set; }

        [Required]
        [MaxLength(100)]
        public string City { get; set; }

        // Navigation Properties
        public Class LastClassId { get; set; }
        public Class AdmissionClassId { get; set; }




    }
}
