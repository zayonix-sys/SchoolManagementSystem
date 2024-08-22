using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class CampusService : ICampuses
    {
        private readonly IGenericRepository<Campus> _campusRepository;

        public CampusService(IGenericRepository<Campus> genericRepository)
        {
            _campusRepository = genericRepository;
        }

        public async Task AddCampusAsync(Campus campus)
        {
            await _campusRepository.AddAsync(campus);
        }

        public async Task DeleteCampusAsync(int campusId)
        {
            await _campusRepository.DeleteAsync(campusId);
        }

        public async Task<List<Campus>> GetAllCampusesAsync()
        {
            return (await _campusRepository.GetAllAsync()).ToList();
        }

        public async Task<Campus> GetCampusByIdAsync(int campusId)
        {
            return await _campusRepository.GetByIdAsync(campusId);
        }

        public async Task UpdateCampusAsync(int id, Campus campus)
        {
            await _campusRepository.UpdateAsync(id, campus);
        }
    }
}
