using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Mappers
{
    public interface IMapper<TDto, TEntity>
    {
        TDto MapToDto(TEntity entity);
        TEntity MapToEntity(TDto dto);
        List<TEntity> MapToEntities(TDto dto);
    }
}
