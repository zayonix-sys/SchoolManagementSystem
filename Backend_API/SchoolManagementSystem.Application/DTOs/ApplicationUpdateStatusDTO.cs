using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.DTOs
{
    public class ApplicationUpdateStatusDTO
    {
        public int ApplicationId { get; set; }

        public string ApplicationStatus { get; set; }
    }
}
