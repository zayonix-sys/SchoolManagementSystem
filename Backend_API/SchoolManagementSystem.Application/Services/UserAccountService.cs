using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Services
{
    public class UserAccountService : IUserAccount
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly UserMapper _mapper;

        public UserAccountService(IGenericRepository<User> genericRepository, UserMapper userMapper)
        {
            _userRepository = genericRepository;
            _mapper = userMapper;
        }
        public async Task<object> AddUser(UserDTO dto)
        {
            var model = _mapper.MapToEntity(dto);
            return await _userRepository.AddAsync(model);
        }

        public async Task<UserDTO> ValidUser(LoginDTO dto)
        {
            var user = (await _userRepository.GetAllAsync(
                include: query => query
                .Include(r => r.UserRole)
                ))
                .FirstOrDefault(x => x.UserName == dto.UserName && x.PasswordHash == dto.Password);

            return _mapper.MapToDto(user);
        }
    }
}
