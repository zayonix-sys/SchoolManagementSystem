using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ExamResultMapper : IMapper<ExamResultDTO, ExamResult>
    {
        public ExamResult MapToEntity(ExamResultDTO dto)
        {
            return new ExamResult
            {
                //ExamResultId = dto.ExamResultId,
                IsActive = dto.IsActive
            };
        }

        public List<ExamResult> MapToEntities(ExamResultDTO dto)
        {
            var entities = new List<ExamResult>();

            foreach (var examDetail in dto.ExamDetails)
            {
                entities.Add(new ExamResult
                {
                    ExamResultId = examDetail.ExamResultId,
                    ExamPaperId = examDetail.ExamPaperId,
                    StudentId = examDetail.StudentId,
                    MarksObtained = examDetail.MarksObtained,
                    TotalMarksObtained = examDetail.TotalMarksObtained,
                    Percentage = examDetail.Percentage,
                    Grade = examDetail.Grade,
                    IsActive = dto.IsActive
                });
            }   
            return entities;
        }

        public ExamResultDTO MapToDto(ExamResult entity)
        {
            return new ExamResultDTO
            {
                GrNo = entity.Student.GrNo,
                DateOfBirth = entity.Student.DateOfBirth,
                FirstName = entity.Student.FirstName,
                LastName = entity.Student.LastName,
                SubjectName = entity.ExamPaper.Subject.SubjectName,
                ClassName = entity.ExamPaper.Class.ClassName,
                TermName = entity.ExamPaper.TermName,
                TotalMarks = entity.ExamPaper.TotalMarks,
                IsActive = entity.IsActive,
                ExamDetails = new List<ExamDetailsResultDTO>
        {
            new ExamDetailsResultDTO
            {
                ExamResultId = entity.ExamResultId,
                ExamPaperId = entity.ExamPaperId,
                StudentId = entity.StudentId,
                MarksObtained = entity.MarksObtained,
                TotalMarksObtained = entity.TotalMarksObtained,
                Percentage = entity.Percentage,
                Grade = entity.Grade
            }
        }
            };
        }
    }
}
