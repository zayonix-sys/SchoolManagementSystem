using SchoolManagementSystem.Application.DTOs;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IInventoryItems
    {
        Task<List<InventoryItemDTO>> GetAllInventoryItemsAsync();
        Task<InventoryItemDTO> GetInventoryItemByIdAsync(int itemId);
        Task AddInventoryItemAsync(InventoryItemDTO item);
        Task UpdateInventoryItemAsync(InventoryItemDTO item);
        Task DeleteInventoryItemAsync(int itemId);
    }
}
