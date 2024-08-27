using System.ComponentModel.DataAnnotations;


namespace SchoolManagementSystem.Domain.Entities
{
    public class Applicants
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
        public DateTime DateOfBirth { get; set; }

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

        [Required]
        [MaxLength(100)]
        public string LastClassAttended { get; set; }

        [Required]
        [MaxLength(100)]
        public string AdmissionRequiredInClass { get; set; }

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

        // Navigation Property
        //public virtual ICollection<Application> Applications { get; set; }

        // Navigation Property for Parents
        //public virtual ICollection<Parents> Parents { get; set; }
        public Parents? Parents { get; set; }
    }
}
