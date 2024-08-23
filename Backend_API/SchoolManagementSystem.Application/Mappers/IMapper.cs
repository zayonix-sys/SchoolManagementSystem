using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Mappers
{
    public interface IMapper<TDto, TEntity>
    {
        TEntity MapToEntity(TDto dto);
        TDto MapToDto(TEntity entity);
    }
}
