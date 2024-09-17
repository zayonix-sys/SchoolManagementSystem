using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Domain.Entities
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string UserName { get; set; }

        [Required]
        [StringLength(255)]
        public string PasswordHash { get; set; }

        [ForeignKey("UserRole")]
        public int RoleId { get; set; }

        [ForeignKey("Campus")]
        public int CampusId { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public UserRole UserRole { get; set; }
        public Campus Campus { get; set; }
    }
}
