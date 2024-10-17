"use client";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { ClassData, fetchClasses } from "@/services/ClassService";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchQuestions, QuestionsData } from "@/services/QBankService";
import QuestionsReport from "./reports";
import AddQuestions from "./question/add-question";
import { AssignSubjectData, fetchAssignSubject } from "@/services/assignSubjectService";
import ExamPaperTemplate from "./examPaper/add-exampaper";
import ExamPaperTable from "./examPaper/exam-table";
import AddScheduleExams from "./scheduleExam/add-schedule-exams";
import ExamScheduleTable from "./scheduleExam/examSchedule-table";
import { ExamScheduleData, fetchExamsSchedule } from "@/services/ExamScheduleService";

const QuestionBank = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subjects, setSubjects] = useState<AssignSubjectData[]>([]);
  const [questions, setQuestions] = useState<QuestionsData[]>([]);
  const [examSchedule, setExamSchedule] = useState<ExamScheduleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [classData, subjectData, questionsData, ExamScheduleData] =
          await Promise.all([
            fetchClasses(),
            fetchAssignSubject(),
            fetchQuestions(),
            fetchExamsSchedule()
          ]);

        setClasses(classData.data as ClassData[]);
        setSubjects(subjectData.data as AssignSubjectData[]);
        setQuestions(questionsData.data as QuestionsData[]);
        setExamSchedule(ExamScheduleData.data as ExamScheduleData[]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Academic</BreadcrumbItem>
          <BreadcrumbItem className="text-primary">Question Bank</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end space-x-4">
          <AddQuestions classes={classes} subject={subjects}/>
          <ExamPaperTemplate questionData={questions} classData={classes} subjectData={subjects}/>
          <AddScheduleExams classes={classes} subject={subjects}/>
        </div>

      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md divide-y mt-5"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="shadow-none rounded-none open">
          <AccordionTrigger>View Question Bank</AccordionTrigger>
          <AccordionContent>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
                <QuestionsReport Questions={questions} classData={classes} subjectData={subjects}/>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md divide-y mt-5 "
        defaultValue="item-2"
      >
        <AccordionItem value="item-2" className="shadow-none rounded-none open">
          <AccordionTrigger>Exam Schedule</AccordionTrigger>
          <AccordionContent>
            <div className="col-span-12 md:col-span-8">
              <ExamScheduleTable  examSchedule={examSchedule} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-md divide-y mt-5"
        defaultValue="item-3"
      >
        <AccordionItem value="item-2" className="shadow-none rounded-none open">
          <AccordionTrigger>View Exam Papers</AccordionTrigger>
          <AccordionContent>
            <div className="col-span-12 md:col-span-8">
              <ExamPaperTable  questionBank={questions}/>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    
  
     
    </div>
  );
};

export default QuestionBank;
