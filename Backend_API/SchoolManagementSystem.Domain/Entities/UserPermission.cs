using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Domain.Entities
{
    public class UserPermission
    {
        [Key]
        public int PermissionId { get; set; }

        [ForeignKey("UserRole")]
        public int RoleId { get; set; }

        [Required]
        [StringLength(50)]
        public string Entity { get; set; }

        [Required]
        public bool CanCreate { get; set; }

        [Required]
        public bool CanRead { get; set; }

        [Required]
        public bool CanUpdate { get; set; }

        [Required]
        public bool CanDelete { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [ForeignKey("CreatedUser")]
        public int CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        [ForeignKey("UpdatedUser")]
        public int? UpdatedBy { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        // Navigation properties
        public UserRole UserRole { get; set; }
        public User CreatedUser { get; set; }
        public User UpdatedUser { get; set; }
    }
}
