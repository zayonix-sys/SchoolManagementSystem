﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagementSystem.Domain.Entities
{
    public class Subject
    {
        [Key]
        public int? SubjectId { get; set; }

        [Required]
        [StringLength(50)]
        public string SubjectName { get; set; }

        [StringLength(255)]
        public string SubjectDescription { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [ForeignKey("CreatedUser")]
        public int? CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        [ForeignKey("UpdatedUser")]
        public int? UpdatedBy { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        // Navigation properties
        public User CreatedUser { get; set; }
        public User UpdatedUser { get; set; }
    }
}