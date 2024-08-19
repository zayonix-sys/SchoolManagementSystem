using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Domain.Entities
{
    public class StudentAttendance
    {
        [Key]
        public int AttendanceId { get; set; }

        [Required]
        public int StudentId { get; set; }

        [Required]
        public DateTime AttendanceDate { get; set; }

        [Required]
        [MaxLength(20)]
        public string AttendanceStatus { get; set; }

        // Navigation Property
        [ForeignKey("StudentId")]
        public virtual Student Student { get; set; }
    }
}
