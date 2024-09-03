"use client"
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClassroomData } from '@/services/classroomService';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClassData } from '@/services/ClassService';
import { SectionData } from '@/services/SectionService';
import { addClassSectionAssignment } from '@/services/assignClassService';

//we can change the props "side"'s value to 'top', 'left', 'bottom', 'right' so that the sheet will come out from different direction.
 
const assignclassesSchema = z.object({
  classroomId: z.coerce.number(),
  classId: z.coerce.number(),
  sectionId: z.coerce.number(),
  
});

type AssignClassFormValues = z.infer<typeof assignclassesSchema>;
interface ClassAssignmentProps {
  classes: ClassData[];
  classroom: ClassroomData[];
  section: SectionData[];
}

  export default function AddAssignClasses({classes, classroom, section,}: ClassAssignmentProps) {

    const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
    } = useForm<AssignClassFormValues>({
      resolver: zodResolver(assignclassesSchema),
    });

    const onSubmit: SubmitHandler<AssignClassFormValues> = async (data) => {
      try {
        const response = await addClassSectionAssignment(data);
  
        if (response.success) {
          // const roomNumber = Array.isArray(response.data)
          //   ? response.data[0].roomNumber
          //   : response.data.roomNumber;
          toast.success(`Class Assigned successfully!`);
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
            Assign Classes
          </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Select Classroom / Class / Section</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5 ">
            <hr />
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <div className="grid grid-cols-6 gap-4 mt-5">
              <div className="col-span-3">
                  <Select
                    onValueChange={(value) =>
                      setValue("classroomId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Classroom" />
                    </SelectTrigger>
                    <SelectContent>
                      {classroom.map((classroomData) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={classroomData.classroomId}
                          value={classroomData.classroomId?.toString() ?? ""}
                        >
                          {classroomData.roomNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.classroomId && (
                    <p className="text-destructive">
                      {errors.classroomId.message}
                    </p>
                  )}
                </div>
                <div className="col-span-3 ">
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
                <div className="col-span-2 lg:col-span-3">
                <Select
                    onValueChange={(value) =>
                      setValue("sectionId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Section" />
                    </SelectTrigger>
                    <SelectContent>
                      {section.map((sectionData) => (
                        <SelectItem
                          className="hover:bg-default-300"
                          key={sectionData.sectionId}
                          value={sectionData.sectionId?.toString() ?? ""}
                        >
                          {sectionData.sectionName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.sectionId && (
                    <p className="text-destructive">
                      {errors.sectionId.message}
                    </p>
                  )}
                </div>
                {/* <div className="col-span-3 lg:col-span-1">
                <Input
                        type="number"
                        placeholder="capacity"
                        {...register("capacity")}
                      />
                      {errors.capacity && (
                        <p className="text-destructive">
                          {errors.capacity.message}
                        </p>
                      )}
                </div> */}
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