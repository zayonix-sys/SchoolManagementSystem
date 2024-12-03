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
        private readonly IStudent _studentRepository;
        private readonly IGenericRepository<ApplicantApplicationView> _applicationApplicationRepository;
        private readonly ApplicantMapper _mapper;
        private readonly ApplicationMapper _mapperApplication;
        private readonly ApplicantApplicationMapper _mapperApplicantApplication;

        public ApplicantService(IGenericRepository<Applicant> genericRepository, 
            IGenericRepository<AdmissionApplication> applicationRepository, 
            IGenericRepository<ApplicantApplicationView> applicantApplicationRepository,
            IStudent studentRepository,
            ApplicantMapper applicantMapper, ApplicationMapper mapperApplication, ApplicantApplicationMapper applicantApplicationMapper)
        {
            _applicantRepository = genericRepository;
            _applicationRepository = applicationRepository;
            _applicationApplicationRepository = applicantApplicationRepository;
            _mapper = applicantMapper;
            _mapperApplication = mapperApplication;
            _mapperApplicantApplication = applicantApplicationMapper;
            _studentRepository = studentRepository;
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

        public async Task UpdateApplicantAsync(ApplicantDTO dto)
        {
            var model = _mapper.MapToEntity(dto);
            await _applicantRepository.UpdateAsync(model);
        }

        public async Task UpdateApplicationAsync(ApplicationDTO dto)
        {
            var model = _mapperApplication.MapToEntity(dto);
            await _applicationRepository.UpdateAsync(model);
        }

        public async Task ApplicationStatus(ApplicationUpdateStatusDTO dto)
        {
            var app = await _applicationRepository.GetByIdAsync(dto.ApplicationId);

            var applicantEntities = await _applicationApplicationRepository.GetAllAsync();
            var applicationData = applicantEntities.FirstOrDefault(x => x.ApplicationId == dto.ApplicationId);

            if (app != null)
            {
                app.ApplicationStatus = dto.ApplicationStatus;
                await _applicationRepository.UpdateAsync(app);
            }

            if (applicationData != null)
            {
                var students = await _studentRepository.GetAllStudentAsync();
                var studentData = students.FirstOrDefault(x => x.GrNo == dto.ApplicationId);

                if (studentData == null)
                {
                    if (dto.ApplicationStatus == "Approved")
                    {
                        Student newStudent = new Student
                        {
                            GrNo = applicationData.ApplicationId,
                            FirstName = applicationData.FirstName,
                            LastName = applicationData.LastName,
                            DateOfBirth = applicationData.DateOfBirth,
                            Gender = applicationData.Gender,
                            Email = applicationData.Email,
                            PhoneNumber = applicationData.PhoneNumber,
                            EnrollmentDate = DateTime.Now,
                            ClassId = applicationData.AppliedClassId,
                            SectionId = dto.SectionId,
                            CampusId = applicationData.CampusId,
                            IsActive = true,
                            CreatedBy = 1,
                        };

                        await _studentRepository.AddStudentAsync(newStudent);
                    }
                }
                else 
                {
                    if (dto.ApplicationStatus == "Rejected")
                    {
                        studentData.IsActive = false;
                        await _studentRepository.UpdateStudentAsync(studentData);
                    }
                    else if (dto.ApplicationStatus == "Approved")
                    {
                        studentData.IsActive = true;
                        studentData.SectionId = dto.SectionId;
                        await _studentRepository.UpdateStudentAsync(studentData);
                    }
                }
            }
        }


    }
}
