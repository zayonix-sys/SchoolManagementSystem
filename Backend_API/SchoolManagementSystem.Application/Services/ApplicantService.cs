using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Services
{
    public class ApplicantService : IApplicant
    {
        private readonly IGenericRepository<Applicant> _applicantRepository;
        private readonly ApplicantMapper _mapper;

        public ApplicantService(IGenericRepository<Applicant> genericRepository, ApplicantMapper applicantMapper)
        {
            _applicantRepository = genericRepository;
            _mapper = applicantMapper;
        }

        public async Task AddApplicantAsync(ApplicantDTO dto)
        {
            var model = _mapper.MapToEntity(dto);
            await _applicantRepository.AddAsync(model);
        }


        public async Task DeleteApplicantAsync(int appId)
        {
            await _applicantRepository.DeleteAsync(appId);
        }

        public async Task<List<Applicant>> GetAllApplicantsAsync()
        {
            return (await _applicantRepository.GetAllAsync()).ToList();
        }

        public async Task<Applicant> GetApplicantByIdAsync(int appId)
        {
            return await _applicantRepository.GetByIdAsync(appId);
        }

        //public async Task UpdateApplicantAsync(Applicants app)
        //{
        //    await _applicantRepository.UpdateAsync(app);
        //}

    }
}
