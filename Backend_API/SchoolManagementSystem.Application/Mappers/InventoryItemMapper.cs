using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Mappers
{
    public class InventoryItemMapper : IMapper<InventoryItemDTO, InventoryItem>
    {
        public InventoryItemDTO MapToDto(InventoryItem entity)
        {
            return new InventoryItemDTO
            {
                ItemId = entity.ItemId,
                CategoryId = entity.CategoryId,
                CategoryName = entity?.InventoryCategories?.CategoryName,
                ItemName = entity.ItemName,
                StatusName = entity?.InventoryStatus?.StatusName,
                ReorderLevel = entity.ReorderLevel,
                TotalQuantity = entity.TotalQuantity,
                UnitPrice = entity.UnitPrice,
                CreatedAt = entity.CreatedAt,
                CreatedBy = entity.CreatedBy,
                Description = entity.Description,
                IsActive = entity.IsActive,
                UpdatedAt = entity.UpdatedAt,
                UpdatedBy = entity.UpdatedBy
            };
        }

        public List<InventoryItem> MapToEntities(InventoryItemDTO dto)
        {
            throw new NotImplementedException();
        }

        public InventoryItem MapToEntity(InventoryItemDTO dto)
        {
            return new InventoryItem
            {
                ItemId = dto.ItemId,
                CategoryId = dto.CategoryId,
                StatusId = dto.StatusId,
                ItemName = dto.ItemName,
                ReorderLevel = dto.ReorderLevel,
                TotalQuantity = dto.TotalQuantity,
                UnitPrice = dto.UnitPrice,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = dto.CreatedBy,
                Description = dto.Description,
                IsActive = true,
                UpdatedAt = dto.UpdatedAt,
                UpdatedBy = dto.UpdatedBy
            };
        }


    }
}
