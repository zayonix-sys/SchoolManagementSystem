using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ApplicantMapper : IMapper<ApplicantAdmissionDTO, Applicant>
    {
        public ApplicantAdmissionDTO MapToDto(Applicant entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new ApplicantAdmissionDTO
            {
                ApplicantId = entity.ApplicantId,
                LastClassId = entity.LastClassId,
                AdmissionClassId = entity.AdmissionClassId,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                FormBNumber = entity.FormBNumber,
                DateOfBirth = entity.DateOfBirth,
                Gender = entity.Gender,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber,
                ApplicantAddress = entity.ApplicantAddress,
                ResidenceStatus = entity.ResidenceStatus,
                City = entity.City,
                MotherTounge = entity.MotherTounge,
                States = entity.States,
                CreatedAt = entity.CreatedAt,
                CreatedBy = entity.CreatedBy,
                UpdatedAt = entity.UpdatedAt,
                UpdatedBy = entity.UpdatedBy,
                IsActive = entity.IsActive
            };
        }

        public Applicant MapToEntity(ApplicantAdmissionDTO dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            return new Applicant
            {
                ApplicantId = dto.ApplicantId,
                LastClassId = dto.LastClassId,
                AdmissionClassId = dto.AdmissionClassId,
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
                CreatedAt = dto.CreatedAt,
                CreatedBy = dto.CreatedBy,
                UpdatedAt = dto.UpdatedAt,
                UpdatedBy = dto.UpdatedBy,
                IsActive = dto.IsActive
            };

        }
    }
}
