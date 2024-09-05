"use client"
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClassData, fetchClasses } from '@/services/ClassService';
import { SubjectData } from '@/services/subjectService';
import { addClassSubjectAssignment } from '@/services/assignSubjectService';
import { useEffect, useState } from 'react';

//we can change the props "side"'s value to 'top', 'left', 'bottom', 'right' so that the sheet will come out from different direction.
 
const assignSubjectsSchema = z.object({
  classSubjectId: z.coerce.number().optional(),
  classId: z.coerce.number(),
  subjectId: z.number().min(1, "Subject is Required"),
  // subjectId: z.array(z.coerce.number()).nonempty("At least one subject must be selected."),
  
});

type AssignSubjectFormValues = z.infer<typeof assignSubjectsSchema>;

// interface OptionType {
//   value: number;
//   label: string;
// }

// interface SubjectData {
//   subjectId: number;
//   subjectName: string;
// }
// interface ClassSubjectProps {
//   classes: ClassData[];
//   subject: SubjectData[];
// }

export default function AddAssignSubject({classes, subject}: {classes: ClassData[], subject: SubjectData[]}) {
  
  // const subjectOptions: OptionType[] = subject.map(sub => ({
  //   value: sub.subjectId,
  //   label: sub.subjectName,
  // }));

  // const handleSelectChange = (selectedOptions: OptionType[] | null) => {
  //   const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    
  //   console.log(selectedValues); // Log the array of selected subject IDs
  // };
  // const handleSelectChange = (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
  //   const selectedValues = newValue.map(option => option.value);
  //   setValue("subjectId", selectedValues); 
  //   console.log(selectedValues); // Log the array of selected subject IDs
  // };
  // const [subjects, setSubjects] = useState<SubjectData[]>([]);
  // const [classes, setClasses] = useState<ClassData[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchClassesAndSubjectsData = async () => {
  //     setLoading(true);
  //     try {
  //       const classData = await fetchClasses();
  //       const sectionData = await fetchSection();
  //       setClasses(classData.data as ClassData[]);
  //       setSubjects(sectionData.data as SubjectData[]);
  //     } catch (err) {
  //       setError(err as any); 
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchClassesAndSubjectsData();
  // }, []);

    const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
    } = useForm<AssignSubjectFormValues>({
      resolver: zodResolver(assignSubjectsSchema),
    });

    const onSubmit: SubmitHandler<AssignSubjectFormValues> = async (data) => {
      try {
        const response = await addClassSubjectAssignment(data);
  
        if (response.success) {
          // const subjectName = Array.isArray(response.data)
          //   ? response.data[0].subjectName
          //   : response.data.subjectName;
          toast.success("Subject Assigned successfully!");
          reset();
        } else {
          console.error("Error:", response);
          toast.error(`Error: ${response.message || "Something went wrong"}`);
        }
      } catch (error) {
        console.error("Request Failed:", error);
        toast.error("Request Failed");
      }
    };
  
    const handleError = () => {
      if (Object.keys(errors).length > 0) {
        toast.error("Please correct the errors in the form.");
      }
    };
  

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
            <span className='text-xl mr-1'>
                <Icon icon="heroicons:building-library-solid" className="w-6 h-6 mr-2  " />
            </span>
            Assign Subjects To Class
          </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Select Subjects </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5 ">
            <hr />
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-6 gap-4 mt-5">
              <div className="col-span-3">
              {/* <Select
                    onChange={(option) => setValue("classId", option?.value ?? 0)}
                    options={classes.map((classData) => ({
                      value: classData.classId,
                      label: classData.className,
                    }))}
                    placeholder="Select Class"
                  /> */}
                  <Select
                    onValueChange={(value) =>
                      setValue("classId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((classData) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={classData.classId}
                          value={classData.classId?.toString() ?? ""}
                        >
                          {classData.className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.classId && (
                    <p className="text-destructive">
                      {errors.classId.message}
                    </p>
                  )}
                </div>

                

                <div className="col-span-3">
                <Select
                    onValueChange={(value) =>
                      setValue("subjectId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subject.map((sub) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={sub.subjectId}
                          value={sub.subjectId?.toString() ?? ""}
                        >
                          {sub.subjectName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subjectId && (
                    <p className="text-destructive">{errors.subjectId.message}</p>
                  )}
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
}