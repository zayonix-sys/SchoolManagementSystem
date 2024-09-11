﻿using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ApplicationMapper : IMapper<ApplicationDTO, AdmissionApplication>
    {
        public ApplicationDTO MapToDto(AdmissionApplication entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new ApplicationDTO
            {
                ApplicantId = entity.ApplicantId,
                CampusId = entity.CampusId,
                AdmissionClassId = entity.ClassId,
                AdmissionDecisionDate = entity.AdmissionDecisionDate,
                ApplicationStatus = entity.ApplicationStatus,
                Remarks = entity.Remarks,
            };
        }

        public List<AdmissionApplication> MapToEntities(ApplicationDTO dto)
        {
            throw new NotImplementedException();
        }

        public AdmissionApplication MapToEntity(ApplicationDTO dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            return new AdmissionApplication
            {
                ApplicationId = dto.ApplicationId,
                ApplicantId = Convert.ToInt32(dto.ApplicantId),
                CampusId = dto.CampusId,
                ClassId = dto.AdmissionClassId,
                AdmissionDecisionDate = dto.AdmissionDecisionDate,
                ApplicationStatus = dto.ApplicationStatus,
                Remarks = dto.Remarks
                //CreatedAt = dto.CreatedAt,
                //CreatedBy = dto.CreatedBy,
                //UpdatedAt = dto.UpdatedAt,
                //UpdatedBy = dto.UpdatedBy,
                //IsActive = dto.IsActive
            };

        }
    }
}
