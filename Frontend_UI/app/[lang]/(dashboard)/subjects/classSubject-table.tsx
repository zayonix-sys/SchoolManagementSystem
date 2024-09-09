// "use client";

// import React, { useState, useEffect } from "react";
// import { Icon } from "@iconify/react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { AssignClassData, assignClasses, deleteClassassignment } from "@/services/assignClassService";
// import { ClassData } from "@/services/ClassService";
// import { SubjectData } from "@/services/subjectService";
// import { AssignSubjectData, deleteClassSubjectAssignment, fetchAssignSubject } from "@/services/assignSubjectService";
// import EditClassSubjectAssign from "./edit-classsubjectassignment";

// interface SubjectAssignmentProps {
//   classes: ClassData[];
//   subject: SubjectData[];
// }

// const SubjectAssignTable = ({ classes, subject }: SubjectAssignmentProps) => {
//   const [subjectAssignment, setSubjectassignment] = useState<AssignSubjectData[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRows, setSelectedRows] = useState<number[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Function to fetch class data
//   useEffect(() => {
//     const fetchClassSubjectAssignData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchAssignSubject();
//         setSubjectassignment(response.data as AssignSubjectData[]);
//       } catch (err) {
//         setError(err as any);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClassSubjectAssignData();
//   }, []);

//       const combinedData = subjectAssignment.map((assignment) => {
//       const associatedClass = classes.find((cls) => cls.classId === assignment.classId);
//       const associatedSubject = subject.find((subject => subject.subjectId === assignment.subjectId));  

//       return {
//         classSubjectId: assignment.classSubjectId,
//         className: associatedClass?.className || "",
//         subjectName: associatedSubject?.subjectName || "",
//         classId: assignment.classId,
//         subjectId: assignment.subjectId,
//         isActive: assignment.isActive

//       };
//     });

//     const filteredSubjectassignments = combinedData.filter((item) =>
//       item.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Pagination
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredSubjectassignments.slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.ceil(filteredSubjectassignments.length / itemsPerPage);

//     const handlePreviousPage = () => {
//       setCurrentPage((prev) => Math.max(prev - 1, 1));
//     };

//     const handleNextPage = () => {
//       setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//     };

//     const handleDelete = async (id: number) => {
//       const isConfirmed = confirm("Are you sure you want to delete this Assigned Class Subject?");

//       if (isConfirmed) {
//         try {
//           await deleteClassSubjectAssignment(id);
//           alert("Assigned Subject/s deleted successfully");
//           fetchAssignSubject(); // Refresh the data after deletion
//         } catch (error) {
//           console.error("Error deleting assigned subject:", error);
//           alert("Failed to delete assigned subject");
//         }
//       } else {
//         alert("Deletion cancelled");
//       }
//     };

//   // // Grouping subjects by classId
//   // const groupedData = subjectAssignment.reduce((acc, assignment) => {
//   //   const associatedClass = classes.find((cls) => cls.classId === assignment.classId);
//   //   const associatedSubject = subject.find((sub) => sub?.subjectId === assignment.subjectId);

//   //   if (associatedClass && associatedSubject) {
//   //     if (!acc[assignment.classId]) {
//   //       acc[assignment.classId] = {
//   //         className: associatedClass.className,
//   //         classId: assignment.classId,
//   //         subjects: [],
//   //         isActive: assignment.isActive ?? false,
//   //       };
//   //     }
//   //     acc[assignment.classId].subjects.push({
//   //       subjectName: associatedSubject.subjectName,
//   //       subjectId: associatedSubject.subjectId,
//   //     });
//   //   }
//   //   return acc;
//   // }, {} as Record<number, { className: string; classId: number; subjects: any[]; isActive: boolean }>);

//   // const combinedData = Object.values(groupedData).flatMap((classData) => {
//   //   const rows = [];
//   //   for (let i = 0; i < classData.subjects.length; i += 5) {
//   //     const subjectsChunk = classData.subjects.slice(i, i + 5).map(sub => sub.subjectName).join(" | ");

//   //     // If subjectId should be a single number, take the first subjectId
//   //     const subjectId = classData.subjects[i]?.subjectId || 0; // Default to 0 or another fallback

//   //     rows.push({
//   //       classSubjectId: classData.classId + i,
//   //       className: classData.className,
//   //       subjectName: subjectsChunk,
//   //       subjectId: subjectId, // Pass only the first subjectId
//   //       classId: classData.classId,
//   //       isActive: classData.isActive,
//   //       isLastRow: i + 5 >= classData.subjects.length,
//   //     });
//   //   }
//   //   return rows;
//   // });

//   // const filteredSubjectassignments = combinedData.filter((item) =>
//   //   item.className.toLowerCase().includes(searchQuery.toLowerCase())
//   // );

//   // const indexOfLastItem = currentPage * itemsPerPage;
//   // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   // const currentItems = filteredSubjectassignments.slice(indexOfFirstItem, indexOfLastItem);

//   // const totalPages = Math.ceil(filteredSubjectassignments.length / itemsPerPage);

//   // const handlePreviousPage = () => {
//   //   setCurrentPage((prev) => Math.max(prev - 1, 1));
//   // };

//   // const handleNextPage = () => {
//   //   setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   // };

//   // const handleDelete = async (id: number) => {
//   //   const isConfirmed = confirm("Are you sure you want to delete this Assigned Class Subject?");
//   //   if (isConfirmed) {
//   //     try {
//   //       await deleteClassSubjectAssignment(id);
//   //       alert("Assigned Subject/s deleted successfully");
//   //       fetchAssignSubject(); // Refresh the data after deletion
//   //     } catch (error) {
//   //       console.error("Error deleting assigned subject:", error);
//   //       alert("Failed to delete assigned subject");
//   //     }
//   //   } else {
//   //     alert("Deletion cancelled");
//   //   }
//   // };


//   return (
//     <>
//       <div className="mb-4 flex justify-between items-center mt-5">
//         <Input
//           type="text"
//           placeholder="Search by Room Number..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="border p-2 rounded"
//         />
//       </div>
//       <Table className="text-left condensed">
//         <TableHeader>
//           <TableRow>
//           <TableHead className="h-10 p-2.5">Class Name</TableHead>
//             <TableHead className="h-10 p-2.5">Subject Name</TableHead>
//             <TableHead className="h-10 p-2.5">Status</TableHead>
//             <TableHead className="h-10 p-2.5 text-end">Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {currentItems.map((item) => (
//             <TableRow
//               key={item.classSubjectId}
//               className="hover:bg-default-200"
//               data-state={
//                 selectedRows.includes(item.classSubjectId!) && "selected"
//               }
//             > 
//               <TableCell className="p-2.5">{item.className}</TableCell>
//               <TableCell className="p-2.5">{item.subjectName}</TableCell>
//               <TableCell className="p-2.5">
//                 <Badge
//                   variant="outline"
//                   color={item.isActive ? "success" : "destructive"}
//                   className="capitalize"
//                 >
//                   {item.isActive ? "Active" : "Inactive"}
//                 </Badge>
//               </TableCell>

//               <TableCell className="p-2.5 flex justify-end">
//                 <div className="flex gap-3">
//                  {/* <EditClassSubjectAssign  subjectAssignmentData={item}/> */}

//                   <Button
//                     size="icon"
//                     variant="outline"
//                     className="h-7 w-7"
//                     color="secondary"
//                     onClick={() => handleDelete(item.classSubjectId!)}
//                   >
//                     <Icon icon="heroicons:trash" className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* <Table className="text-left condensed">
//         <TableHeader>
//           <TableRow>
//             <TableHead className="h-10 p-2.5">Class Name</TableHead>
//             <TableHead className="h-10 p-2.5">Subjects</TableHead>
//             <TableHead className="h-10 p-2.5">Status</TableHead>
//             <TableHead className="h-10 p-2.5 text-end">Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {currentItems.map((item) => (
//             <TableRow key={item.classSubjectId} className="hover:bg-default-200">
//               <TableCell className="p-2.5">{item.className}</TableCell>
//               <TableCell className="p-2.5">
//                 {item.subjectName.split("|").map((subject, index) => (
//                   <span key={index} className="mr-2">{subject}</span> // Split into spans
//                 ))}
//               </TableCell>

//               <TableCell className="p-2.5">
//                 <Badge
//                   variant="outline"
//                   color={item.isActive ? "success" : "destructive"}
//                   className="capitalize"
//                 >
//                   {item.isActive ? "Active" : "Inactive"}
//                 </Badge>
//               </TableCell>

//               <TableCell className="p-2.5 flex justify-end">
//                 <div className="flex gap-3">
//                   <EditClassSubjectAssign subjectAssignmentData={item} />

//                   <Button
//                     size="icon"
//                     variant="outline"
//                     className="h-7 w-7"
//                     color="secondary"
//                     onClick={() => handleDelete(item.classSubjectId!)}
//                   >
//                     <Icon icon="heroicons:trash" className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table> */}
//       <div className="flex justify-between items-center mt-4">
//         <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
//           Previous
//         </Button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
//           Next
//         </Button>
//       </div>
//     </>
//   );
// };

// export default SubjectAssignTable;

"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AssignSubjectData, deleteClassSubjectAssignment, fetchAssignSubject } from "@/services/assignSubjectService";
import { ClassData } from "@/services/ClassService";
import { SubjectData } from "@/services/subjectService";
import EditClassSubjectAssign from "./edit-classsubjectassignment";

interface SubjectAssignmentProps {
  classes: ClassData[];
  subject: SubjectData[];
}

const SubjectAssignTable = ({ classes, subject }: SubjectAssignmentProps) => {
  const [subjectAssignments, setSubjectAssignments] = useState<AssignSubjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchClassSubjectAssignData = async () => {
      setLoading(true);
      try {
        const response = await fetchAssignSubject();
        setSubjectAssignments(response.data as AssignSubjectData[]);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchClassSubjectAssignData();
  }, []);

  // Group subjects by classId
  const groupedAssignments = subjectAssignments.reduce((acc, assignment) => {
    const associatedClass = classes.find((cls) => cls.classId === assignment.classId);
    const associatedSubjects = subject.filter((sub) => assignment.subjectIds.includes(sub.subjectId ?? 0));

    if (associatedClass) {
      if (!acc[assignment.classId]) {
        acc[assignment.classId] = {
          classSubjectId: assignment.classSubjectId,
          className: associatedClass.className,
          subjects: [],
          isActive: assignment.isActive ?? false,
        };
      }
      acc[assignment.classId].subjects.push(...associatedSubjects.map(sub => sub.subjectName));
    }
    return acc;
  }, {} as Record<number, { classSubjectId?: number; className: string; subjects: string[]; isActive?: boolean }>);

  const combinedData = Object.values(groupedAssignments);

  const filteredAssignments = combinedData.filter((item) =>
    item.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssignments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = confirm("Are you sure you want to delete this Assigned Class Subject?");

    if (isConfirmed) {
      try {
        await deleteClassSubjectAssignment(id);
        alert("Assigned Subject/s deleted successfully");
        fetchAssignSubject(); // Refresh the data after deletion
      } catch (error) {
        console.error("Error deleting assigned subject:", error);
        alert("Failed to delete assigned subject");
      }
    } else {
      alert("Deletion cancelled");
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center mt-5">
        <Input
          type="text"
          placeholder="Search by Class Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <Table className="text-left condensed">
        <TableHeader>
          <TableRow>
            <TableHead className="h-10 p-2.5">Class Name</TableHead>
            <TableHead className="h-10 p-2.5">Subjects</TableHead>
            <TableHead className="h-10 p-2.5">Status</TableHead>
            <TableHead className="h-10 p-2.5 text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.classSubjectId}
              className="hover:bg-default-200"
              data-state={
                selectedRows.includes(item.classSubjectId!) && "selected"
              }
            >
              <TableCell className="p-2.5">{item.className}</TableCell>
              <TableCell className="p-2.5">
                {item.subjects.join(" | ")}
              </TableCell>
              <TableCell className="p-2.5">
                <Badge
                  variant="outline"
                  color={item.isActive ? "success" : "destructive"}
                  className="capitalize"
                >
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="p-2.5 flex justify-end">
                <div className="flex gap-3">
                  {/* <EditClassSubjectAssign subjectAssignmentData={item} /> */}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    color="secondary"
                    onClick={() => handleDelete(item.classSubjectId!)}
                  >
                    <Icon icon="heroicons:trash" className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </>
  );
};

export default SubjectAssignTable;
