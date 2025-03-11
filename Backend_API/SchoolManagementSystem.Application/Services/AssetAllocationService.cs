using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class AssetAllocationService : IAssetAllocation
    {
        private readonly IGenericRepository<AssetAllocation> _assetAllocationRepository;
        private readonly IGenericRepository<InventoryStock> _inventoryStockRepository;
        private readonly AssetAllocationMapper _mapper;

        public AssetAllocationService(
            IGenericRepository<AssetAllocation> genericRepository,
            IGenericRepository<InventoryStock> inventoryStockRepository,
            AssetAllocationMapper assetsMapper
            )
        {
            _assetAllocationRepository = genericRepository;
            _inventoryStockRepository = inventoryStockRepository;
            _mapper = assetsMapper;
        }

        public async Task AllocateAssetAsync(AssetAllocationDTO dto)
        {
            var model = _mapper.MapToEntity(dto);
            await _assetAllocationRepository.AddAsync(model);

            var stockData = new InventoryStock
            {
                ItemId = dto.ItemId,
                Quantity = dto.Quantity,
                StatusId = dto.StatusId,
                Remarks = "Allocated To " + dto.AllocatedLocation,
                TransactionType = "OUT",
                TransactionDate = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = dto.CreatedBy,
                IsActive = true,
            };

            await _inventoryStockRepository.AddAsync(stockData);
        }

        public async Task DeleteAllocatedAssetAsync(int allocationId)
        {
            var allocatedAsset = await _assetAllocationRepository.GetByIdAsync(allocationId);
            if (allocatedAsset != null)
            {
                allocatedAsset.IsActive = false;
                await _assetAllocationRepository.UpdateAsync(allocatedAsset);
            }
        }

        public async Task<List<AssetAllocationDTO>> GetAllAllocatedAssetsAsync()
        {
            var allocatedAsset = await _assetAllocationRepository.GetAllAsync(
                include: query => query
                .Include(x => x.InventoryItems)
                .Include(x => x.InventoryStatuses)
                .Include(x => x.Users)
                );
            var list = allocatedAsset.Select(_mapper.MapToDto).ToList();
            return list;
        }

        public async Task UpdateAllocatedAssetAsync(AssetAllocationDTO dto)
        {
            var existingEntity = await _assetAllocationRepository.GetByIdAsync(dto.AllocationId);

            if (existingEntity == null)
            {
                throw new KeyNotFoundException("Allocated Asset not found.");
            }

            var result = _mapper.MapToEntity(dto);
            result.CreatedAt = existingEntity.CreatedAt;
            result.CreatedBy = existingEntity.CreatedBy;
            result.UpdatedAt = DateTime.UtcNow;
            await _assetAllocationRepository.UpdateAsync(result, true);
        }

    }
}
