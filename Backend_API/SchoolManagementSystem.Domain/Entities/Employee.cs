using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace SchoolManagementSystem.Domain.Entities
{
    public class Employee
    {
        [Key]
        public int? EmployeeId { get; set; }

        [ForeignKey("EmployeeRoles")]
        public int? RoleId { get; set; }

        //[ForeignKey("Campuses")]
        public int? CampusId { get; set; }

        [ForeignKey("Departments")]
        public int? DepartmentId { get; set; }

        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MaxLength(50)]
        public string? LastName { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }

        [Required]
        public DateTime? HireDate { get; set; }

        [MaxLength(100)]
        public string? Department { get; set; }

        [MaxLength(250)]
        public string? Address { get; set; }

        [MaxLength(100)]
        public string? EmergencyContact { get; set; }

        [MaxLength(250)]
        public string? Qualifications { get; set; }

        [Required]
        public DateTime? CreatedAt { get; set; } = DateTime.Now;

        [ForeignKey("CreatedUser")]
        public int? CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        [ForeignKey("UpdatedUser")]
        public int? UpdatedBy { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        // Navigation properties
        public virtual ICollection<Campus> Campuses { get; set; }
        public virtual ICollection<Department> Departments { get; set; }
        public EmployeeRoles EmployeeRoles { get; set; }
        public User CreatedUser { get; set; }
        public User UpdatedUser { get; set; }
        public Employee()
        {
            Campuses = new HashSet<Campus>();
            Departments = new HashSet<Department>();
        }
    }
}
