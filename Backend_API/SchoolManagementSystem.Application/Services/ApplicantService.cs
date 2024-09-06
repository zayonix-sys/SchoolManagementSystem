using LinqKit;
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
        private readonly IGenericRepository<ApplicantApplicationView> _applicationApplicationRepository;
        private readonly ApplicantMapper _mapper;
        private readonly ApplicationMapper _mapperApplication;
        private readonly ApplicantApplicationMapper _mapperApplicantApplication;

        public ApplicantService(IGenericRepository<Applicant> genericRepository, 
            IGenericRepository<AdmissionApplication> applicationRepository, 
            IGenericRepository<ApplicantApplicationView> applicantApplicationRepository,
            ApplicantMapper applicantMapper, ApplicationMapper mapperApplication, ApplicantApplicationMapper applicantApplicationMapper)
        {
            _applicantRepository = genericRepository;
            _applicationRepository = applicationRepository;
            _applicationApplicationRepository = applicantApplicationRepository;
            _mapper = applicantMapper;
            _mapperApplication = mapperApplication;
            _mapperApplicantApplication = applicantApplicationMapper;
        }

        public async Task<int> AddApplicantAsync(ApplicantDTO dto)
        {
            //Adding Applicant
            var model = _mapper.MapToEntity(dto);
            var applicantId = await _applicantRepository.AddAsync(model);

            return (int)applicantId;
        }

        public async Task AddAdmissionApplicationAsync(ApplicationDTO dto, int applicantId)
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

        public async Task<List<ApplicantApplicationViewDTO>> GetAllApplicantApplicationAsync()
        {
            var lst = new List<ApplicantApplicationViewDTO>();
            var applicantEntites = await _applicationApplicationRepository.GetAllAsync();
            applicantEntites.ForEach(x => lst.Add(_mapperApplicantApplication.MapToDto(x)));

            return lst;
        }

        public async Task<AdmissionApplication> GetApplicantByIdAsync(int appId)
        {
            return await _applicationRepository.GetByIdAsync(appId);
        }

        public async Task UpdateApplicantAsync(ApplicantAdmissionDTO app)
        {
            //var model = _mapper.MapToEntity(app);
            //await _applicationRepository.UpdateAsync(model);
        }

    }
}
