using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.DTOs
{
    public class ClassroomDTO
    {
        public int ClassroomId { get; set; }
        public int CampusId { get; set; }
        public string RoomNumber { get; set; }
        public string Building { get; set; }
        public int Capacity { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? CreatedBy { get; set; } = 2;
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
