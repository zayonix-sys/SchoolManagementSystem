"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Adjusted service import
import { ClassData } from "@/services/ClassService";
import { AssignSubjectData } from "@/services/assignSubjectService";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import 'react-quill/dist/quill.snow.css';
import { addQuestions } from "@/services/QBankService";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

const questionSchema = z.object({
  classId: z.coerce.number(),
  subjectId: z.coerce.number(),
  questionType: z.string().min(1, "Question Type is required"),
  questions: z.string().min(1, "Questions is required").max(10000, "Questions cannot exceed 10000 characters"),
  marks: z.number().min(1, "Marks are required"),
});

type QuestionsFormValues = z.infer<typeof questionSchema>;

interface QuestionProps {
  classes: ClassData[];
  subject: AssignSubjectData[];
}
export default function AddQuestions({ subject, classes }: QuestionProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<QuestionsFormValues>({
    resolver: zodResolver(questionSchema),
  });

  const selectedClassId = watch("classId");

  const filteredClassSubjects = subject.filter(
    (subjects) => subjects.classId === selectedClassId && subjects.isActive
  );

  const onSubmit: SubmitHandler<QuestionsFormValues> = async (data) => {
    console.log("Data Submitted", data);
    try {
      const response = await addQuestions(data);

      if (response.success) {
        toast.success(`${data.questionType} added successfully!`);
        reset();
      } else {
        toast.error(`Error: ${response.message || "Something went wrong"}`);
      }
    } catch (error) {
      toast.error("Request Failed");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <span className="text-xl mr-1">
            <Icon
              icon="heroicons:building-library-solid"
              className="w-6 h-6 mr-2"
            />
          </span>
          Add a Question
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Add New Question</SheetTitle>
        </SheetHeader>

        <div
          className="flex flex-col justify-between"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="py-5">
            <hr />
            <form onSubmit={handleSubmit((onSubmit))}>
              <div className="grid grid-cols-2 mt-3 gap-4">
                <div className="col-span-1">
                  <Label>Select Class</Label>
                  <Select onValueChange={(value) => setValue("classId", parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cd) => (
                        <SelectItem key={cd?.classId ?? ''} value={cd?.classId?.toString() ?? ''}>
                          {cd.className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.classId && <p className="text-destructive">{errors.classId.message}</p>}
                </div>
                <div className="col-span-1">
                  <Label>Select Subject</Label>
                  <Select onValueChange={(value) => setValue("subjectId", parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredClassSubjects.map((subjectData) => (
                        <SelectItem key={subjectData.subjectIds[0]} value={subjectData.subjectIds[0].toString()}>
                          {subjectData.subjectName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subjectId && <p className="text-destructive">{errors.subjectId.message}</p>}
                </div>

                <div className="col-span-1">
                  <Label>Select Question Type</Label>
                  <Select onValueChange={(value) => setValue("questionType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Question Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MCQ">MCQ</SelectItem>
                      <SelectItem value="Descriptive">Descriptive</SelectItem>
                      <SelectItem value="Short Questions">Short Question</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.questionType && <p className="text-destructive">{errors.questionType.message}</p>}
                </div>
                
                <div className="col-span-1">
                <Label>Total Marks</Label>
                  <Input
                    type="number"
                    placeholder="Question Marks"
                    {...register("marks", {valueAsNumber: true})}
                  />
                  {errors.marks && (<p className="text-destructive"> {errors.marks.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                <Label>Type Your Question</Label>
                  <ReactQuill
                    onChange={(value) => {
                      setValue("questions", value); 
                    }}
                    modules={{
                      toolbar: [
                        [{ header: '1'}, { header: '2'}, { header: '3'}, { header: '4'}, { font: [] }],
                        [{ list: 'ordered'}, { list: 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        [{ align: [] }],
                        ['link', 'image'],
                      ],
                    }}
                  />
                  {errors.questions && (<p className="text-destructive">{errors.questions.message}</p>)}
                </div>
                <div className="col-span-2">
                  <Button type="submit">Submit Form</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};


{/* <Sheet >
<SheetTrigger asChild>
  <Button>
    <span className="text-xl mr-1">
      <Icon
        icon="heroicons:building-library-solid"
        className="w-6 h-6 mr-2"
      />
    </span>
    Add Template
  </Button>
</SheetTrigger>
<SheetContent className="max-w-[60%]" >
  <SheetHeader> */}
    {/* <SheetTitle>Add New Question</SheetTitle> */}
  {/* </SheetHeader>

  <div className="max-w-[100%] mx-auto p-8 bg-white border shadow-md h-[85vh] overflow-y-auto"> */}
    {/* Static fields */}
    {/* <div className="flex justify-between">
      <div className='flex'>
        <div>
          <img src="/images/logo.jpg" alt="School Logo" className="w-25" />
        </div>
        <div className='pt-4'
          style={{marginLeft: "7rem"}}
        >
          
          <h1 className="text-xl font-bold">The Beginners Academy</h1>
          <p>{term}</p>
          <p>Class - {className}</p>
          <p>Subject: {subject}</p>
        </div>
      </div>
      <div className="border p-4">
        <p>Written: {marks.written}</p>
        <p>Dictation: {marks.dictation}</p>
        <p>Oral: {marks.oral}</p>
        <p>Copy: {marks.copy}</p>
        <p className="font-bold">Total Marks: {marks.total}</p>
      </div>
    </div> */}

    {/* Editable content */}
    {/* <h2 className="mt-10 font-bold">Attempt all Questions</h2>

    {questions.map((question, index) => (
      <div key={index} className="mt-4">
        <h3 className="font-bold">
          Q{index + 1}. {question} (Marks 10)
        </h3> */}
        {/* You can replace this textarea with a rich text editor */}
        {/* <textarea
          className="w-full border p-2 mt-2"
          rows={4}
          defaultValue={question}
          onChange={(e) => {
            const newQuestions = [...questions];
            newQuestions[index] = e.target.value;
            setQuestions(newQuestions);
          }}
        />
      </div>
    ))} */}

    {/* Add other sections like summary, final marks here */}
   {/* </div>
  <SheetFooter>
    <SheetClose asChild>footer content</SheetClose>
  </SheetFooter>
</SheetContent>
</Sheet>  */}