using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class FeeVoucherMapper : IMapper<FeeVoucherDTO, FeeVoucher>
    {
        public FeeVoucherDTO MapToDto(FeeVoucher entity)
        {
            return new FeeVoucherDTO
            {
                FeeVoucherId = entity.FeeVoucherId,
                StudentId = entity.StudentId,
                CampusId = entity.CampusId,
                FeeMonth = entity.FeeMonth,
                FeeYear = entity.FeeYear,
                TotalAmount = entity.TotalAmount,
                DueDate = entity.DueDate,
                Paid = entity.Paid,
                PaymentDate = entity.PaymentDate,
                LateFee = entity.LateFee,
                IsActive = entity.IsActive,
                CreatedBy = entity.CreatedBy,
            };
        }

        public List<FeeVoucher> MapToEntities(IEnumerable<FeeVoucherDTO> dto)
        {
            throw new NotImplementedException();
        }

        public List<FeeVoucher> MapToEntities(FeeVoucherDTO dto)
        {
            throw new NotImplementedException();
        }

        public FeeVoucher MapToEntity(FeeVoucherDTO dto)
        {
            return new FeeVoucher
            {
                FeeVoucherId = dto.FeeVoucherId,
                StudentId = dto.StudentId,
                CampusId = dto.CampusId,
                FeeMonth = dto.FeeMonth,
                FeeYear = dto.FeeYear,
                TotalAmount = dto.TotalAmount,
                DueDate = dto.DueDate,
                Paid = dto.Paid,
                PaymentDate = dto.PaymentDate,
                LateFee = dto.LateFee,
                IsActive = dto.IsActive,
                CreatedBy = dto.CreatedBy,
            };
        }
    }
}
