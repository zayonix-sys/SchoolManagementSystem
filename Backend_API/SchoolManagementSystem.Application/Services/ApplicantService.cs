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
            var applicantId = await _applicantRepository.AddAsync(model);

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
