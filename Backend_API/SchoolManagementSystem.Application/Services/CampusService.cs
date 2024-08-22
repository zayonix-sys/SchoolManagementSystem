using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class CampusService : ICampuses
    {
        private readonly IGenericRepository<Campus> _campusRepository;
        private readonly CampusMapper _mapper;

        public CampusService(IGenericRepository<Campus> genericRepository, CampusMapper campusMapper)
        {
            _campusRepository = genericRepository;
            _mapper = campusMapper;
        }

        public async Task AddCampusAsync(CampusDTO dto)
        {
            var model = _mapper.MapToEntity(dto);
            await _campusRepository.AddAsync(model);
        }

        public async Task DeleteCampusAsync(int campusId)
        {
            await _campusRepository.DeleteAsync(campusId);
        }

        public async Task<List<CampusDTO>> GetAllCampusesAsync()
        {
            var lst = new List<CampusDTO>();
            var response =  (await _campusRepository.GetAllAsync()).ToList();
            response.ForEach(x => lst.Add(_mapper.MapToDto(x)));

            return lst;
        }

        public async Task<CampusDTO> GetCampusByIdAsync(int campusId)
        {
           var response = await _campusRepository.GetByIdAsync(campusId);
            return _mapper.MapToDto(response);
        }

        public async Task UpdateCampusAsync(int id, CampusDTO dto)
        {
            var model = _mapper.MapToEntity(dto);
            await _campusRepository.UpdateAsync(id, model);
        }
    }
}
