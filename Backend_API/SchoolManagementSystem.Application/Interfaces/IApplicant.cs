using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IApplicant
    {
        Task<List<ApplicantAdmissionDTO>> GetAllApplicantsAsync();
        Task<AdmissionApplication> GetApplicantByIdAsync(int appId);
        Task<int> AddApplicantAsync(ApplicantAdmissionDTO dto);
        Task AddAdmissionApplicationAsync(ApplicantAdmissionDTO dto, int id);
        Task UpdateApplicantAsync(ApplicantAdmissionDTO app);
        Task DeleteApplicantAsync(int appId);

    }
}
