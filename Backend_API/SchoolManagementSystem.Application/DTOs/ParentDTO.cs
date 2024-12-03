using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.DTOs
{
    public class ParentDTO
    {
        public int? ParentId { get; set; }
        public string? FullName { get; set; }
        public string? ParentEmail { get; set; }
        public string? ParentPhoneNumber { get; set; }
        public string? ParentAddress { get; set; }
        public string? RelationWithApplicant { get; set; }
        public string? Qualification { get; set; }
        public string? Occupation { get; set; }
        public string? SourceOfIncome { get; set; }

    }
}
