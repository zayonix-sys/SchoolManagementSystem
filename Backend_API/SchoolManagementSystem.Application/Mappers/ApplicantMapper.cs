using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ApplicantMapper : IMapper<ApplicantAdmissionDTO, AdmissionApplication>
    {
        public ApplicantAdmissionDTO MapToDto(AdmissionApplication entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new ApplicantAdmissionDTO
            {
                ApplicantId = entity.Applicant.ApplicantId,
                FirstName = entity.Applicant.FirstName,
                LastName = entity.Applicant.LastName,
                FormBNumber = entity.Applicant.FormBNumber,
                DateOfBirth = entity.Applicant.DateOfBirth,
                Gender = entity.Applicant.Gender,
                Email = entity.Applicant.Email,
                PhoneNumber = entity.Applicant.PhoneNumber,
                ApplicantAddress = entity.Applicant.ApplicantAddress,
                ResidenceStatus = entity.Applicant.ResidenceStatus,
                City = entity.Applicant.City,
                MotherTounge = entity.Applicant.MotherTounge,
                States = entity.Applicant.States,
                CreatedAt = entity.CreatedAt,
                CreatedBy = entity.CreatedBy,
                UpdatedAt = entity.UpdatedAt,
                UpdatedBy = entity.UpdatedBy,
                IsActive = entity.IsActive,
                LastClassId = entity.Applicant.ClassId,
                LastAttendedClass = entity.Class?.ClassName,
                AdmissionClassId = entity.ClassId,
                ClassForAdmission = entity.Applicant.Class?.ClassName,
                CampusId = entity.CampusId,
                CampusName = entity.Campus.CampusName
            };
        }

        public AdmissionApplication MapToEntity(ApplicantAdmissionDTO dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            return new AdmissionApplication
            {
                ApplicantId = dto.ApplicantId,
                Applicant = new Applicant {
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    FormBNumber = dto.FormBNumber,
                    DateOfBirth = dto.DateOfBirth,
                    Gender = dto.Gender,
                    Email = dto.Email,
                    PhoneNumber = dto.PhoneNumber,
                    ApplicantAddress = dto.ApplicantAddress,
                    ResidenceStatus = dto.ResidenceStatus,
                    City = dto.City,
                    MotherTounge = dto.MotherTounge,
                    States = dto.States,
                    ClassId = dto.LastClassId,
                },
                ClassId = dto.LastClassId,
                CreatedAt = dto.CreatedAt,
                CreatedBy = dto.CreatedBy,
                UpdatedAt = dto.UpdatedAt,
                UpdatedBy = dto.UpdatedBy,
                IsActive = dto.IsActive
            };

        }
    }
}
