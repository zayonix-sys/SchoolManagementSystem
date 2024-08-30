using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ApplicationMapper : IMapper<ApplicantAdmissionDTO, AdmissionApplication>
    {
        public ApplicantAdmissionDTO MapToDto(AdmissionApplication entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new ApplicantAdmissionDTO
            {
                ApplicationId = entity.ApplicationId,
                ApplicantId = entity.ApplicantId,
                CampusId = entity.CampusId,
                ClassId = entity.ClassId,
                AdmissionDecisionDate = entity.AdmissionDecisionDate,
                ApplicationStatus = entity.ApplicationStatus,
                Remarks = entity.Remarks,
                CreatedAt = entity.CreatedAt,   
                CreatedBy = entity.CreatedBy,
                UpdatedAt = entity.UpdatedAt,
                UpdatedBy = entity.UpdatedBy,
                
                IsActive = entity.IsActive,

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
                ApplicationId = dto.ApplicationId,
                ApplicantId = dto.ApplicantId,
                CampusId= dto.CampusId,
                ClassId= dto.ClassId,
                AdmissionDecisionDate = dto.AdmissionDecisionDate,
                ApplicationStatus = dto.ApplicationStatus,
                Remarks= dto.Remarks,
                CreatedAt = dto.CreatedAt,
                CreatedBy = dto.CreatedBy,
                UpdatedAt = dto.UpdatedAt,
                UpdatedBy = dto.UpdatedBy,
                IsActive = dto.IsActive
            };

        }
    }
}
