using SchoolManagementSystem.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IUserAccount
    {
        Task<object> AddUser(UserDTO dto);
        Task<UserDTO> ValidUser(LoginDTO dto);
    }
}
