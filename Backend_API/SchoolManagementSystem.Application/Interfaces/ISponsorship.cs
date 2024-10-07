using SchoolManagementSystem.Application.DTOs;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface ISponsorship
    {
        Task<List<SponsorshipDTO>> GetAllSponsorshipsAsync();
        Task<SponsorshipDTO> GetSponsorshipByIdAsync(int sponsorshipId);
        Task AddSponsorshipAsync(SponsorshipDTO dto);
        Task UpdateSponsorshipAsync(SponsorshipDTO dto);
        Task DeleteSponsorshipAsync(int sponsorshipId);

    }
}
