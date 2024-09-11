using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class TimeTableService : ITimeTable
    {
        private readonly IGenericRepository<TimeTable> _genericRepository;
        private readonly TimeTableMapper _timeTableMapper;

        public TimeTableService(IGenericRepository<TimeTable> genericRepository, TimeTableMapper timeTableMapper)
        {
            _genericRepository = genericRepository;
            _timeTableMapper = timeTableMapper;
        }

        public async Task AddTimeTableAsync(TimeTableDTO dto)
        {
            var model = _timeTableMapper.MapToEntity(dto);
            await _genericRepository.AddAsync(model);
        }

        public async Task DeleteTimeTableAsync(int timeTableId)
        {
            var result = await _genericRepository.GetByIdAsync(timeTableId);
            if (result != null)
            {
                result.IsActive = false;
                await _genericRepository.UpdateAsync(result);
            }
        }

        public async Task<List<TimeTableDTO>> GetAllTimeTablesAsync()
        {
            try
            {
                var result = await _genericRepository.GetAllAsync(
                include: query => query
                .Include(c => c.Campus)
                .Include(c => c.Class)
                .Include(s => s.Subject)
                );
                var activeResult = result.Where(s => s.IsActive).ToList();
                var lst = activeResult.Select(_timeTableMapper.MapToDto).ToList();

                return lst;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task UpdateTimeTableAsync(TimeTableDTO dto)
        {
            var model = _timeTableMapper.MapToEntity(dto);
            await _genericRepository.UpdateAsync(model);
        }

    }
}
