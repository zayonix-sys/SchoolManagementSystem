using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace SchoolManagementSystem.Domain.Entities
{
    public class Student
    {
        [Key]
        public int StudentId { get; set; }

        [Required]
        public int GrNo { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [MaxLength(10)]
        public string Gender { get; set; }

        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [Phone]
        [MaxLength(15)]
        public string PhoneNumber { get; set; }

        [Required]
        public DateTime EnrollmentDate { get; set; }

        [MaxLength(255)]
        public string ProfileImage { get; set; }

        [Required]
        public int ClassId { get; set; }

        [Required]
        public int SectionId { get; set; }

        // Navigation Properties
        [ForeignKey("ClassId")]
        public virtual Class Class { get; set; }

        [ForeignKey("SectionId")]
        public virtual Section Section { get; set; }
    }
}
