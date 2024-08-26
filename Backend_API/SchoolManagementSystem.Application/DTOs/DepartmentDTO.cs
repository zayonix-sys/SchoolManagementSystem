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
    public class DepartmentDTO
    {
        public int DepartmentId { get; set; }

        public int CampusId { get; set; }

        public string DepartmentName { get; set; }

        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;

        // Navigation property
        public Campus? Campus { get; set; }
    }
}
