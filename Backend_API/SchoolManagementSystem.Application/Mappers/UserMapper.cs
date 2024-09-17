using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Mappers
{
    public class UserMapper : IMapper<UserDTO, User>
    {
        public UserDTO MapToDto(User entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new UserDTO
            {
                RoleId = entity.RoleId,
                CampusId = entity.CampusId,
                UserName = entity.UserName,
                PasswordHash = entity.PasswordHash,
                IsActive = entity.IsActive,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                UserId = entity.UserId,
                RoleName = entity?.UserRole?.RoleName
            };
        }

        public List<User> MapToEntities(UserDTO dto)
        {
            throw new NotImplementedException();
        }

        public User MapToEntity(UserDTO dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            return new User
            {
                UserId = dto.UserId,
                UserName = dto.UserName,
                PasswordHash = dto.PasswordHash,
                IsActive = dto.IsActive,
                CampusId = dto.CampusId,
                RoleId = dto.RoleId,
                CreatedAt = dto.CreatedAt,
                UpdatedAt= dto.UpdatedAt
            };
        }
    }
}
