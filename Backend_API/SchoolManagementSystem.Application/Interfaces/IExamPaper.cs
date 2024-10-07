﻿using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Application.Interfaces
{
    public interface IExamPaper
    {
        Task<List<ExamPaperDTO>> GetAllExamPapersAsync();
        Task AddExamPaperAsync(ExamPaperDTO examPaper);
        Task UpdateExamPaperAsync(ExamPaperDTO examPaper);
        Task DeleteExamPaperAsync(int exampaperId);

    }
}
