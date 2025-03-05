using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class InventoryItemService : IInventoryItems
    {
        private readonly IGenericRepository<InventoryItem> _inventoryItemRepository;
        private readonly InventoryItemMapper _mapper;

        public InventoryItemService(IGenericRepository<InventoryItem> genericRepository, InventoryItemMapper itemMapper)
        {
            _inventoryItemRepository = genericRepository;
            _mapper = itemMapper;
        }

        public async Task AddInventoryItemAsync(InventoryItemDTO dto)
        {
            var model = _mapper.MapToEntity(dto);
            await _inventoryItemRepository.AddAsync(model);
        }

        public async Task DeleteInventoryItemAsync(int itemId)
        {
            var inventoryItem = await _inventoryItemRepository.GetByIdAsync(itemId);
            if (inventoryItem != null)
            {
                inventoryItem.IsActive = false;
                await _inventoryItemRepository.UpdateAsync(inventoryItem);
            }
        }

        public async Task<List<InventoryItemDTO>> GetAllInventoryItemsAsync()
        {
            var inventoryItem = await _inventoryItemRepository.GetAllAsync(
                include: query => query.Include(x => x.InventoryCategories).Include(x => x.InventoryStatus)
                );
            var activeInventoryItem = inventoryItem.Where(c => c.IsActive).ToList();

            var list = activeInventoryItem.Select(_mapper.MapToDto).ToList();
            return list;
        }

        public async Task<InventoryItemDTO> GetInventoryItemByIdAsync(int itemId)
        {
            var response = await _inventoryItemRepository.GetByIdAsync(itemId);
            return _mapper.MapToDto(response);
        }

        public async Task UpdateInventoryItemAsync(InventoryItemDTO dto)
        {
            var existingEntity = await _inventoryItemRepository.GetByIdAsync(dto.ItemId);

            if (existingEntity == null)
            {
                throw new KeyNotFoundException("Inventory category not found.");
            }

            var result = _mapper.MapToEntity(dto);
            result.CreatedAt = existingEntity.CreatedAt;
            result.CreatedBy = existingEntity.CreatedBy;
            result.UpdatedAt = DateTime.UtcNow;
            await _inventoryItemRepository.UpdateAsync(result, true);
        }

    }
}
