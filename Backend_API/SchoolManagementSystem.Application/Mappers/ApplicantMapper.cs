using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ApplicantMapper : IMapper<ApplicantDTO, Applicants>
    {
        public ApplicantDTO MapToDto(Applicants entity)
        {
            throw new NotImplementedException();
        }

        public Applicants MapToEntity(ApplicantDTO dto)
        {
            return new Applicants
            {
                ApplicantId = dto.ApplicantId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                FormBNumber = dto.FormBNumber,
                DateOfBirth = dto.DateOfBirth,
                Gender = dto.Gender,
                AdmissionRequiredInClass = dto.AdmissionRequiredInClass,
                LastClassAttended = dto.LastClassAttended,
                ApplicationDate = dto.ApplicationDate,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                ApplicantAddress = dto.ApplicantAddress,
                Nationality = dto.Nationality,
                States = dto.States,
                City = dto.City,
                Languages = dto.Languages,
                ResidenceStatus = dto.ResidenceStatus,
                Parents = dto.Parents,
            };
        }

        //public ApplicantDTO MapToDtoWithSubEntity(ApplicantDTO entity)
        //{
            //return new Applicants
            //{
            //    ApplicantId = entity.ApplicantId,
            //    FirstName = entity.FirstName,
            //    LastName = entity.LastName,
            //    FormBNumber = entity.FormBNumber,
            //    DateOfBirth = entity.DateOfBirth,
            //    Gender = entity.Gender,
            //    AdmissionRequiredInClass = entity.AdmissionRequiredInClass,
            //    LastClassAttended = entity.LastClassAttended,
            //    ApplicationDate = entity.ApplicationDate,
            //    Email = entity.Email,
            //    PhoneNumber = entity.PhoneNumber,
            //    ApplicantAddress = entity.ApplicantAddress,
            //    Nationality = entity.Nationality,
            //    States = entity.States,
            //    City = entity.City,
            //    Languages = entity.Languages,                
            //    Parents = entity.Parents.Select(d => d.ApplicantId == entity.ApplicantId)
                // Map related entities
                //Parents = entity.Parents.Select(d => new ParentDTO
                //{
                //    ParentId = d.ParentId,
                //    FirstName = d.FirstName,
                //    LastName = d.LastName,
                //    Email = d.Email,
                //    PhoneNumber = d.PhoneNumber,
                //    ParentAddress = d.ParentAddress,
                //    RelationWithApplicant = d.RelationWithApplicant,
                //    Qualification = d.Qualification,
                //    Occupation = d.Occupation,
                //    SourceOfIncome = d.SourceOfIncome
                //}).ToList(),
            //};
    }
}
