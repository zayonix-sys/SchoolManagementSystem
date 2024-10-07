
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { deleteTimeTable, fetchTimeTable, TimeTableData } from "@/services/TimeTableService";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import ConfirmationDialog from "../common/confirmation-dialog";
import EditTimeTable from "./edit-timetable";
import { AssignSubjectData } from "@/services/assignSubjectService";
import { PeriodsData } from "@/services/periodService";

// Helper to get all unique periods
const getUniquePeriods = (timeTable: TimeTableData[]) => {
  const periods = new Set<string>();
  timeTable.forEach((entry) => {
    if (entry.periodName) {
      periods.add(entry.periodName);
    }
  });
  return Array.from(periods);
};

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":"); 
  const parsedTime = new Date();
  parsedTime.setHours(parseInt(hour, 10), parseInt(minute, 10));

  return parsedTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, 
  });
};


// Helper to group timetable by day
const groupByDayOfWeek = (timeTable: TimeTableData[]) => {
  return timeTable.reduce((acc: Record<string, TimeTableData[]>, item) => {
    if (!acc[item.dayOfWeek]) {
      acc[item.dayOfWeek] = [];
    }
    acc[item.dayOfWeek].push(item);
    return acc;
  }, {});
};

interface ViewTimeTableProps {
  className: string;
  subjectData: AssignSubjectData[];
  periodsData: PeriodsData[];
}

const ViewTimeTable: React.FC<ViewTimeTableProps> = ({
  className,
  subjectData,
  periodsData,
}) => {
  const [timeTable, setTimeTable] = useState<TimeTableData[]>([]);
  const [timeTableToDelete, setTimeTableToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchTimeTable();
        setTimeTable(response.data);
      } catch (err) {
        setError("Failed to fetch timetable data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredTimeTable = timeTable.filter((entry) => entry.className === className);

  // Sordting of Periods
  // const sortedPeriods = [...periodsData].sort((a, b) => {
  //   return a.periodName.localeCompare(b.periodName, undefined, { numeric: true });
  // });

  // Define a custom order for periods
const periodOrder = [ "1st Period", "2nd Period", "3rd Period", "4th Period", "5th Period", "Break-Time",
                       "6th Period", "7th Period", "8th Period", "9th Period", "10th Period", // Add more if needed
];

// Sort periods based on custom order
const sortedPeriods = [...periodsData].sort((a, b) => {
  const indexA = periodOrder.indexOf(a.periodName);
  const indexB = periodOrder.indexOf(b.periodName);

  // If the period name is not found in the periodOrder array, place it at the end
  return (indexA === -1 ? periodOrder.length : indexA) - (indexB === -1 ? periodOrder.length : indexB);
});


  // Sorting of Days
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const groupedByDay = groupByDayOfWeek(filteredTimeTable);
  const sortedDays = Object.keys(groupedByDay).sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleDeleteConfirmation = (id: number) => {
    setTimeTableToDelete(id);
  };

  const handleCancelDelete = () => {
    setTimeTableToDelete(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTimeTable(id);
      toast.success("Time Table deleted successfully");
      setTimeTableToDelete(null);
    } catch (error) {
      console.error("Error deleting Subject:", error);
      toast.error("Failed to delete Subject");
    }
  };

  return (
    <>
      <Card className="overflow-x-auto">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold sticky left-0 bg-background drop-shadow-lg text-xs">
                Day of the Week
              </TableHead>
              {sortedPeriods.map((period) => (
                <TableHead key={period.periodId} className="font-semibold text-xs text-left">
                  {period.periodName}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="text-left">
            {sortedDays.map((day) => (
              <TableRow key={day}>
                <TableCell className="sticky left-0 bg-background drop-shadow-md font-bold text-left">
                  {day}
                </TableCell>

                {sortedPeriods.map((period) => {
                  const periodEntry = groupedByDay[day].find(
                    (entry) => entry.periodId === period.periodId && entry.className === className
                  );

                  return (
                    <TableCell key={period.periodId} className="text-left text-xs">
                      {periodEntry ? (
                        <div className="flex flex-col">
                          <b>{periodEntry.subjectName}</b>
                          <div>{formatTime(periodEntry.startTime ?? "")}</div>
                          <div>{formatTime(periodEntry.endTime ?? "")}</div>
                          <div className=" drop-shadow-md gap-1 mt-1">
                            <EditTimeTable timetableData={[periodEntry]} useSubjectData={subjectData} />
                            <Button
                              size="icon"
                              variant="outline"
                              className=" h-4 w-4 ms-3"
                              onClick={() => handleDeleteConfirmation(periodEntry.timetableId!)}
                            >
                              <Icon icon="heroicons:trash" className=" h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-left"></div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

{/* <Card className="overflow-x-auto">
  <Table className="w-full table-auto">
    <TableHeader>
      <TableRow>
        <TableHead className="font-semibold sticky left-0 bg-background drop-shadow-lg text-xs min-w-[150px]">
          Day of the Week
        </TableHead>
        {sortedPeriods.map((period) => (
          <TableHead
            key={period.periodId}
            className="font-semibold text-xs text-left min-w-[150px]"
          >
            {period.periodName}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>

    <TableBody className="text-left">
      {sortedDays.map((day) => (
        <TableRow key={day}>
          <TableCell className="sticky left-0 bg-background drop-shadow-md font-bold min-w-[150px]">
            {day}
          </TableCell>

          {sortedPeriods.map((period) => {
            const periodEntry = groupedByDay[day].find(
              (entry) => entry.periodId === period.periodId && entry.className === className
            );

            return (
              <TableCell key={period.periodId} className="text-left text-xs min-w-[150px]">
                {periodEntry ? (
                  <div className="text-left">
                    <b>{periodEntry.subjectName}</b>
                    <div>{formatTime(periodEntry.startTime ?? "")}</div>
                    <div>{formatTime(periodEntry.endTime ?? "")}</div>
                    <div className="flex drop-shadow-md gap-4 mt-1">
                      <EditTimeTable
                        timetableData={[periodEntry]}
                        useSubjectData={subjectData}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-4 w-4"
                        onClick={() => handleDeleteConfirmation(periodEntry.timetableId!)}
                      >
                        <Icon icon="heroicons:trash" className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">-</div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Card> */}


      {timeTableToDelete !== null && (
        <ConfirmationDialog
          onDelete={() => handleDelete(timeTableToDelete)}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default ViewTimeTable;
