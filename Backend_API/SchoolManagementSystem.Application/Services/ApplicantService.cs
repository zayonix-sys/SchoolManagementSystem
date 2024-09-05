using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;

namespace SchoolManagementSystem.Application.Services
{
    public class ApplicantService : IApplicant
    {
        private readonly IGenericRepository<Applicant> _applicantRepository;
        private readonly IGenericRepository<AdmissionApplication> _applicationRepository;
        private readonly ApplicantMapper _mapper;
        private readonly ApplicationMapper _mapperApplication;

        public ApplicantService(IGenericRepository<Applicant> genericRepository, IGenericRepository<AdmissionApplication> applicationRepository, ApplicantMapper applicantMapper, ApplicationMapper mapperApplication)
        {
            _applicantRepository = genericRepository;
            _applicationRepository = applicationRepository;
            _mapper = applicantMapper;
            _mapperApplication = mapperApplication;
        }

        public async Task<int> AddApplicantAsync(ApplicantAdmissionDTO dto)
        {
            //Adding Applicant
            var model = _mapper.MapToEntity(dto);
            var applicantId = await _applicationRepository.AddAsync(model);

            return (int)applicantId;
        }

        public async Task AddAdmissionApplicationAsync(ApplicantAdmissionDTO dto, int applicantId)
        {
            //Adding Applicant
            dto.ApplicantId = applicantId;
            var model = _mapperApplication.MapToEntity(dto);
            await _applicationRepository.AddAsync(model);
        }


        public async Task DeleteApplicantAsync(int appId)
        {
            var applicant = await _applicationRepository.GetByIdAsync(appId);
            if (applicant != null)
            {
                applicant.IsActive = false;
                await _applicationRepository.UpdateAsync(applicant);
            }
        }

        public async Task<List<ApplicantAdmissionDTO>> GetAllApplicantsAsync()
        {

            var applicant = await _applicationRepository.GetAllAsync(
                include: query => query
                .Include(c => c.Class)
                .Include(a => a.Applicant)
                .Include(c => c.Campus)
                );
            var activeApplicant = applicant.Where(c => c.IsActive);

            // Map the entities to DTOs
            var applicantDTOs = activeApplicant.Select(c => _mapper.MapToDto(c)).ToList();

            return applicantDTOs;
        }

        public async Task<AdmissionApplication> GetApplicantByIdAsync(int appId)
        {
            return await _applicationRepository.GetByIdAsync(appId);
        }

        public async Task UpdateApplicantAsync(ApplicantAdmissionDTO app)
        {
            var model = _mapper.MapToEntity(app);
            await _applicationRepository.UpdateAsync(model);
        }

    }
}
