using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Domain.Entities
{
    public class ClassCampusAssignment
    {
        [Key]
        public int AssignmentId { get; set; }

        [ForeignKey("Class")]
        public int ClassId { get; set; }

        [ForeignKey("Campus")]
        public int CampusId { get; set; }

        // Navigation properties
        public Class Class { get; set; }
        public Campus Campus { get; set; }
    }
}
