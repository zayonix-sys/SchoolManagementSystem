using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class SponsorshipMapper : IMapper<SponsorshipDTO, Sponsorship>
    {


        public Sponsorship MapToEntity(SponsorshipDTO dto)
        {
            return new Sponsorship
            {
                SponsorshipId = dto.SponsorshipId,
                Amount = dto.Amount,
                Frequency = dto.Frequency,
                StartDate = dto.StartDate,
                SponsorId = dto.SponsorId,
                ClassId = dto.ClassId,
                StudentId = dto.StudentId,
                CreatedAt = dto.CreatedAt,
                CreatedBy = dto.CreatedBy,
            };
        }
        public SponsorshipDTO MapToDto(Sponsorship entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new SponsorshipDTO
            {
                SponsorshipId = entity.SponsorshipId,
                Amount = entity.Amount,
                Frequency = entity.Frequency,
                StartDate = entity.StartDate,
                ClassId = entity.ClassId,
                StudentId = entity.StudentId,
                SponsorId = entity.SponsorId,
                CreatedAt = entity.CreatedAt,
                CreatedBy = entity.CreatedBy,

                StudentName = entity.Student.FirstName,
                Gender = entity.Student.Gender,
                PhoneNumber = entity.Sponsor.PhoneNumber,
                ClassName = entity.Class?.ClassName,
                SponsorName = entity.Sponsor.SponsorName,

            };
        }

        public List<Sponsorship> MapToEntities(SponsorshipDTO dto)
        {
            throw new NotImplementedException();
        }

    }
}
