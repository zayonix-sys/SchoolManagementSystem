using HtmlAgilityPack;
using QuestPDF.Drawing;  // For drawing-related classes
using QuestPDF.Elements; // For layout-related classes including Column
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QuestPDF.Previewer;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;


public class ExamPaperPdfService : IExamPaperPDF
{
    private readonly IExamPaper _examPaperService;
    private readonly ExamPaperMapper _examPaperMapper;

    public ExamPaperPdfService(IExamPaper examPaperService, ExamPaperMapper examPaperMapper)
    {
        _examPaperService = examPaperService;
        _examPaperMapper = examPaperMapper;
    }

    public async Task<byte[]> GeneratePdf(int classId, int subjectId)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        // Retrieve all exam papers
        var examPapers = await _examPaperService.GetAllExamPapersAsync();
        var examPaperData = examPapers.Where(a => a.ClassId == classId && a.SubjectId == subjectId).ToList();

        if (examPaperData.Any())
        {
            var examPaper = examPaperData.First();
            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(20);
                    page.DefaultTextStyle(x => x.FontSize(12));
                    
                    page.Header().Row(row =>
                    {
                        row.ConstantItem(100).Image("logo.jpg");

                        row.RelativeItem(1).Column(column =>
                        {
                            column.Item().AlignCenter().Text("The Beginners Academy")
                                .Bold().FontSize(22); 
                            column.Item().PaddingLeft(100).AlignLeft().Text($"Term: {examPaper.TermName}")
                                .FontSize(14); 
                            column.Item().PaddingLeft(100).AlignLeft().Text($"Class: {examPaper.ClassName}")
                                .FontSize(14);
                            column.Item().PaddingLeft(100).AlignLeft().Text($"Subject: {examPaper.SubjectName}")
                                .FontSize(14); 
                        });

                        row.ConstantItem(125).Border(1).Padding(5).Column(column =>
                        {
                            column.Item().PaddingTop(10).AlignLeft().Text($"WrittenMarks: {examPaper.WrittenMarks}")
                                .FontSize(12).Bold(); 
                            column.Item().AlignLeft().Text($"OralMarks: {examPaper.OralMarks}")
                                .FontSize(12).Bold(); 
                            column.Item().AlignLeft().Text($"DictationMarks: {examPaper.DictationMarks}")
                                .FontSize(12).Bold();
                            column.Item().AlignLeft().Text($"CopyMarks: {examPaper.CopyMarks}")
                                .FontSize(12).Bold();
                            column.Item().AlignLeft().Text($"TotalMarks: {examPaper.TotalMarks}")
                                .FontSize(14).Bold();
                        }); 
                        
                    });


                    page.Content().PaddingTop(30).PaddingBottom(60).PaddingLeft(15).Column(column =>
                    {
                        column.Item().Row(row =>
                        {
                            row.RelativeItem(50).PaddingTop(10).PaddingBottom(25).AlignLeft().Text("Attempt All Questions").Bold();
                        });

                        if (examPaper.Questions != null)
                        {
                            int questionIndex = 1;

                            foreach (var question in examPaperData)
                            {
                                column.Item().Row(row =>
                                {
                                    var htmlDoc = new HtmlDocument();
                                    htmlDoc.LoadHtml(question.Questions);

                                    row.RelativeItem(1).Column(questionColumn =>
                                    {
                                        questionColumn.Item().PaddingBottom(10).Text($"Question No. {questionIndex}.").FontSize(14).Bold();
                                       
                                        foreach (var node in htmlDoc.DocumentNode.ChildNodes)
                                        {
                                            switch (node.Name)
                                            {
                                                case "h1":
                                                    questionColumn.Item().Text(node.InnerText).FontSize(15).Bold();
                                                    break;
                                                case "h2":
                                                    questionColumn.Item().Text(node.InnerText).FontSize(13).Bold();
                                                    break;
                                                case "p":
                                                    var formattedText = ReplaceMathematicalOperatorsAndSymbols(node.InnerText);
                                                    questionColumn.Item().Text(formattedText).FontSize(12);  
                                                    break;
                                                case "ul":
                                                case "ol":
                                                    foreach (var listItem in node.ChildNodes)
                                                    {
                                                        if (listItem.Name == "li")
                                                        {
                                                            var formattedListItem = ReplaceMathematicalOperatorsAndSymbols(listItem.InnerText);
                                                            questionColumn.Item().PaddingTop(6).PaddingLeft(10).Text($"• {formattedListItem}").FontSize(12);
                                                        }
                                                    }
                                                    break;
                                                case "li":
                                                    var formattedLi = ReplaceMathematicalOperatorsAndSymbols(node.InnerText);
                                                    questionColumn.Item().Text($"• {formattedLi}").FontSize(12);
                                                    break;
                                                case "strong":
                                                    questionColumn.Item().Text(node.InnerText).FontSize(12).Bold();
                                                    break;
                                                case "em":
                                                    questionColumn.Item().Text(node.InnerText).FontSize(12).Italic();
                                                    break;
                                                default:
                                                    questionColumn.Item().Text(node.InnerText).FontSize(12);
                                                    break;
                                            }
                                        }
                                    });

                                    row.ConstantItem(100).AlignRight().Text($"Marks: {question.Marks}").FontSize(14).Bold();
                                });

                                string ReplaceMathematicalOperatorsAndSymbols(string text)
                                {
                                    return text.Replace("*", "×")
                                               .Replace("/", "÷")
                                               .Replace("-", "−")  
                                               .Replace("+", "+")
                                               .Replace("=", "=")
                                               .Replace("{", "{")
                                               .Replace("}", "}")
                                               .Replace("[", "[")
                                               .Replace("]", "]")
                                               .Replace("(", "(")
                                               .Replace(")", ")")
                                               .Replace("@", "@")
                                               .Replace("#", "#")
                                               .Replace("$", "$")
                                               .Replace("%", "%")
                                               .Replace("&", "&")
                                               .Replace("_", "_");
                                }

                                questionIndex++;
                                column.Item().PaddingBottom(35);
                            }
                        }
                    });

                });
            });

            //document.ShowInPreviewer();
            return document.GeneratePdf();
        }
        else
        {
            return Array.Empty<byte>();
        }
    }
}
