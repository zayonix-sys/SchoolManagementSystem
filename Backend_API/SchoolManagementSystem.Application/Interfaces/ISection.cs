using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface ISection
    {
        Task<List<Section>> GetAllSectionAsync();
        Task<Section> GetSectionByIdAsync(int sectionId);
        Task AddSectionAsync(Section sec);
        Task UpdateSectionAsync(int id, Section sec);
        Task DeleteSectionAsync(int sectionId);

    }
}
