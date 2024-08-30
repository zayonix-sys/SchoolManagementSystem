using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IApplicant
    {
        Task<List<Applicant>> GetAllApplicantsAsync();
        Task<Applicant> GetApplicantByIdAsync(int appId);
        Task<int> AddApplicantAsync(ApplicantAdmissionDTO dto);
        Task AddAdmissionApplicationAsync(ApplicantAdmissionDTO dto, int id);
        //Task UpdateApplicantAsync(Applicants app);
        Task DeleteApplicantAsync(int appId);
        
    }
}
