using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class SectionService : ISection
    {
        private readonly IGenericRepository<Section> _sectionRepository;
        private readonly SectionMapper _mapper;


        public SectionService(IGenericRepository<Section> genericRepository, SectionMapper sectionMapper)
        {
            _sectionRepository = genericRepository;
            _mapper = sectionMapper;

        }

        public async Task AddSectionAsync(SectionDTO sec)
        {
            try
            {
                var model = _mapper.MapToEntity(sec);
                await _sectionRepository.AddAsync(model);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Task DeleteSectionAsync(int sectionId)
        {
            throw new NotImplementedException();
        }

        public Task<List<SectionDTO>> GetAllSectionAsync()
        {
            throw new NotImplementedException();
        }

        public Task<SectionDTO> GetSectionByIdAsync(int sectionId)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateSectionAsync(SectionDTO sec)
        {
            var model = _mapper.MapToEntity(sec);
            await _sectionRepository.UpdateAsync(model);
        }

        //public async Task UpdateSectionAsync(SectionDTO sec)
        //{
        //    await _sectionRepository.UpdateAsync(sec);
        //}

        //public async Task AddSectionAsync(Section sec)
        //{
        //    await _sectionRepository.AddAsync(sec);

        //}

        //public async Task DeleteSectionAsync(int sectionId)
        //{
        //    await _sectionRepository.DeleteAsync(sectionId);
        //}

        //public async Task<List<Section>> GetAllSectionAsync()
        //{
        //    return (await _sectionRepository.GetAllAsync()).ToList();
        //}

        //public async Task<Section> GetSectionByIdAsync(int sectionId)
        //{
        //    return await _sectionRepository.GetByIdAsync(sectionId);
        //}

        //public async Task UpdateSectionAsync(int id, Section sec)
        //{
        //    //await _sectionRepository.UpdateAsync(id, sec);
        //}
    }
}
