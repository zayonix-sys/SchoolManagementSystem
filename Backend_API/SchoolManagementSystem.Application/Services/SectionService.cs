using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class SectionService : ISection
    {
        private readonly IGenericRepository<Section> _sectionRepository;

        public SectionService(IGenericRepository<Section> genericRepository)
        {
            _sectionRepository = genericRepository;
        }

        public async Task AddSectionAsync(Section sec)
        {
            await _sectionRepository.AddAsync(sec);

        }

        public async Task DeleteSectionAsync(int sectionId)
        {
            await _sectionRepository.DeleteAsync(sectionId);
        }

        public async Task<List<Section>> GetAllSectionAsync()
        {
            return (await _sectionRepository.GetAllAsync()).ToList();
        }

        public async Task<Section> GetSectionByIdAsync(int sectionId)
        {
            return await _sectionRepository.GetByIdAsync(sectionId);
        }

        public async Task UpdateSectionAsync(int id, Section sec)
        {
            await _sectionRepository.UpdateAsync(id, sec);
        }
    }
}
