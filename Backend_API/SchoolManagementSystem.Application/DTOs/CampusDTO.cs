using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.DTOs
{
    public class CampusDTO
    {
        public int? CampusId { get; set; }
        public string CampusName { get; set; }
        public string Address { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
    }
}
