using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class InventoryStockService : IInventoryStocks
    {
        private readonly IGenericRepository<InventoryStock> _inventoryStockRepository;
        private readonly InventoryStockMapper _mapper;
        private readonly IGenericRepository<InventoryStockView> _stockView;
        private readonly InventoryStockViewMapper _stockViewMapper;

        public InventoryStockService(
            IGenericRepository<InventoryStock> genericRepository, 
            InventoryStockMapper stockMapper, 
            IGenericRepository<InventoryStockView> stockView,
            InventoryStockViewMapper stockViewMapper
            )
        {
            _inventoryStockRepository = genericRepository;
            _mapper = stockMapper;
            _stockView = stockView;
            _stockViewMapper = stockViewMapper;
        }

        public async Task AddInventoryStockAsync(InventoryStockDTO dto)
        {
            var model = _mapper.MapToEntity(dto);
            await _inventoryStockRepository.AddAsync(model);
        }

        public async Task DeleteInventoryStockAsync(int stockId)
        {
            var inventoryStock = await _inventoryStockRepository.GetByIdAsync(stockId);
            if (inventoryStock != null)
            {
                inventoryStock.IsActive = false;
                await _inventoryStockRepository.UpdateAsync(inventoryStock);
            }
        }

        public async Task<List<InventoryStockViewDTO>> GetAllInventoryStocksAsync()
        {
            var inventoryStock = await _stockView.GetAllAsync();
            var list = inventoryStock.Select(_stockViewMapper.MapToDto).ToList();
            return list;
        }

        public async Task<InventoryStockDTO> GetInventoryStockByIdAsync(int stockId)
        {
            var response = await _inventoryStockRepository.GetByIdAsync(stockId);
            return _mapper.MapToDto(response);
        }

        public async Task UpdateInventoryStockAsync(InventoryStockDTO dto)
        {
            var existingEntity = await _inventoryStockRepository.GetByIdAsync(dto.ItemId);

            if (existingEntity == null)
            {
                throw new KeyNotFoundException("Inventory category not found.");
            }

            var result = _mapper.MapToEntity(dto);
            result.CreatedAt = existingEntity.CreatedAt;
            result.CreatedBy = existingEntity.CreatedBy;
            result.UpdatedAt = DateTime.UtcNow;
            await _inventoryStockRepository.UpdateAsync(result);
        }

    }
}
