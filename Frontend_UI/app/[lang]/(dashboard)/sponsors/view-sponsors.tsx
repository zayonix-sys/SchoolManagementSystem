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
import { SponsorData } from "@/services/sponsorService";
import SponsorListTable from "./sponsor-list-table";


export default function ViewSponsors({
    Sponsor,
}: {
    Sponsor: SponsorData[] | null;
}) {
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
                    <SheetTitle>List of Sponsors</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                    <SponsorListTable Sponsor={Sponsor ?? []} />
                </div>
                <SheetFooter>
                    <SheetClose asChild>footer content</SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
