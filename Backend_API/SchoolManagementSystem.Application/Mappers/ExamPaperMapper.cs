﻿using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Domain.Entities;
using System.Collections.Generic;

namespace SchoolManagementSystem.Application.Mappers
{
    public class ExamPaperMapper : IMapper<ExamPaperDTO, ExamPaper>
    {
        public ExamPaper MapToEntity(ExamPaperDTO dto)
        {
            return new ExamPaper
            {
                ExamPaperId = dto.ExamPaperId,
                ClassId = dto.ClassId,
                SubjectId = dto.SubjectId,
                QuestionId = dto.QuestionIds.FirstOrDefault(),
                TermName = dto.TermName,
                TotalMarks = dto.TotalMarks,
                DictationMarks = dto.DictationMarks,
                OralMarks   = dto.OralMarks,
                WrittenMarks = dto.WrittenMarks,
                CopyMarks = dto.CopyMarks,
                IsActive = dto.IsActive
            };
        }

        public List<ExamPaper> MapToEntities(ExamPaperDTO dto)
        {
            var entities = new List<ExamPaper>();

            foreach (var questionId in dto.QuestionIds)
            {
                entities.Add(new ExamPaper
                {
                    ExamPaperId = dto.ExamPaperId,
                    ClassId = dto.ClassId,
                    SubjectId = dto.SubjectId,
                    QuestionId = questionId,
                    TermName = dto.TermName,
                    TotalMarks = dto.TotalMarks,
                    DictationMarks = dto.DictationMarks,
                    OralMarks = dto.OralMarks,
                    WrittenMarks = dto.WrittenMarks,
                    CopyMarks = dto.CopyMarks,
                    IsActive = dto.IsActive
                });
            }
            return entities;
        }
        //public List<ExamPaper> MapToEntities(ExamPaperDTOs dto)
        //{
        //    var entities = new List<ExamPaper>();

        //    // If both ExamPaperIds and QuestionIds are provided and have the same length
        //    if (dto.QuestionIds != null && dto.QuestionIds.Any())
        //    {
        //        for (int i = 0; i < dto.QuestionIds.Count; i++)
        //        {
        //            var examPaperId = dto.ExamPaperIds != null && i < dto.ExamPaperIds.Count
        //                ? dto.ExamPaperIds[i]
        //                : (int?)null; // Assign null if there's no corresponding ExamPaperId

        //            entities.Add(new ExamPaper
        //            {
        //                ExamPaperId = examPaperId, // Map each ExamPaperId if it exists
        //                ClassId = dto.ClassId,
        //                SubjectId = dto.SubjectId,
        //                QuestionId = dto.QuestionIds[i], // Map each QuestionId
        //                TermName = dto.TermName,
        //                TotalMarks = dto.TotalMarks,
        //                DictationMarks = dto.DictationMarks,
        //                OralMarks = dto.OralMarks,
        //                WrittenMarks = dto.WrittenMarks,
        //                CopyMarks = dto.CopyMarks,
        //                IsActive = dto.IsActive
        //            });
        //        }
        //    }

        //    return entities;
        //}

        public ExamPaperDTO MapToDto(ExamPaper entity)
        {
            return new ExamPaperDTO
            {
                ExamPaperId = entity.ExamPaperId,
                ClassId = entity.ClassId,
                SubjectId = entity.SubjectId,
                QuestionIds = entity.QuestionId.HasValue ? new List<int> { entity.QuestionId.Value } : new List<int>(),
                TermName = entity.TermName,
                TotalMarks = entity.TotalMarks,
                DictationMarks = entity.DictationMarks,
                OralMarks = entity.OralMarks,
                WrittenMarks = entity.WrittenMarks,
                CopyMarks = entity.CopyMarks,
                ClassName = entity.Class.ClassName,
                SubjectName = entity.Subject.SubjectName,
                Questions = entity.QuestionsBank.Questions,
                QuestionType = entity.QuestionsBank.QuestionType,
                Marks = entity.QuestionsBank.Marks,
                IsActive = entity.IsActive
            };
        }
    }
}