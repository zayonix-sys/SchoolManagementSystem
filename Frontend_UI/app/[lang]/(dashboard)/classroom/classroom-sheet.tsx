"use client"
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

//we can change the props "side"'s value to 'top', 'left', 'bottom', 'right' so that the sheet will come out from different direction.

export default function ClassroomSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
            <span className='text-xl mr-1'>
                <Icon icon="heroicons:building-library-solid" className="w-6 h-6 mr-2  " />
            </span>
            Add Classroom
          </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Add New Classroom</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr />
            {/* form */}
            <form>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 ">
          <Input type="text" placeholder="Campus Name" />
        </div>
        <div className="col-span-2 ">
          <Input type="text" placeholder="RoomNumber" />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <Input type="text" placeholder="Building" />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <Input type="text" placeholder="Capacity" />
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