using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ApplicantApplicationMapper : IMapper<ApplicantApplicationViewDTO, ApplicantApplicationView>
    {
        public ApplicantApplicationViewDTO MapToDto(ApplicantApplicationView entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new ApplicantApplicationViewDTO
            {
                
                ApplicationId = entity.ApplicationId,
                ApplicationStatus = entity.ApplicationStatus,
                CampusId = entity.CampusId,
                CampusName = entity.CampusName,
                AppliedClassId = entity.AppliedClassId,
                AppliedClassName = entity.AppliedClassName,
                ApplicantId = entity.ApplicantId,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                LastAttendedClassName = entity.LastAttendedClassName,
                LastClassId = entity.LastClassId,
                DateOfBirth = entity.DateOfBirth,
                FormBNumber = entity.FormBNumber,
                Gender = entity.Gender,
                PhoneNumber = entity.PhoneNumber,
                Email = entity.Email,
                AdmissionDecisionDate = entity.AdmissionDecisionDate,
                ApplicantAddress = entity.ApplicantAddress,
                States = entity.States,
                City = entity.City,
                MotherTounge = entity.MotherTounge,
                Remarks = entity.Remarks,
                ResidenceStatus = entity.ResidenceStatus
            };
        }

        public ApplicantApplicationView MapToEntity(ApplicantApplicationViewDTO dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            return new ApplicantApplicationView
            {
                ApplicationId = dto.ApplicationId,
                ApplicationStatus = dto.ApplicationStatus,
                CampusId = dto.CampusId,
                CampusName = dto.CampusName,
                AppliedClassId = dto.AppliedClassId,
                AppliedClassName = dto.AppliedClassName,
                ApplicantId = dto.ApplicantId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                LastAttendedClassName = dto.LastAttendedClassName,
                LastClassId = dto.LastClassId,
                DateOfBirth = dto.DateOfBirth,
                FormBNumber = dto.FormBNumber,
                Gender = dto.Gender,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                AdmissionDecisionDate = dto.AdmissionDecisionDate,
                ApplicantAddress = dto.ApplicantAddress,
                States = dto.States,
                City = dto.City,
                MotherTounge = dto.MotherTounge,
                Remarks = dto.Remarks,
                ResidenceStatus = dto.ResidenceStatus
            };
        }
    }
}
