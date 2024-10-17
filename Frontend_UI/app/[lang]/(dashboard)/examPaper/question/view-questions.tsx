import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { QuestionsData } from "@/services/QBankService";
import QuestionsTable from "./questions-table";


interface QuestionProps {
  Questions: QuestionsData[];
} 

const ViewQuestions = ({Questions}: QuestionProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-transparent text-xs hover:text-default-800 px-1"
        >
          View List
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Subject</SheetTitle>
        </SheetHeader>
        <div>
          <div className="py-6">
            <QuestionsTable Questions={Questions} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ViewQuestions;