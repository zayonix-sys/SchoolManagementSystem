"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Filter,
  FileDown,
  Printer,
  Percent,
  UserPlus,
  Eye,
  MoreHorizontal,
  Download,
  Mail,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export function FeeGrid() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();

  // Mock data for student fee details
  const studentFees = [
    {
      id: "1001",
      studentId: 1001,
      name: "John Doe",
      grNo: "5023",
      class: "Grade 10",
      campus: "Main Campus",
      totalFees: 12500.0,
      paidAmount: 7500.0,
      pendingAmount: 5000.0,
      dueDate: "2024-05-15",
      status: "Partial",
      lastPayment: "2024-04-10",
      discount: 0,
      sponsor: null,
    },
    {
      id: "1002",
      studentId: 1002,
      name: "Jane Smith",
      grNo: "5024",
      class: "Grade 10",
      campus: "Main Campus",
      totalFees: 12500.0,
      paidAmount: 12500.0,
      pendingAmount: 0.0,
      dueDate: "2024-05-15",
      status: "Paid",
      lastPayment: "2024-04-05",
      discount: 10,
      sponsor: null,
    },
    {
      id: "1003",
      studentId: 1003,
      name: "Michael Johnson",
      grNo: "5025",
      class: "Grade 11",
      campus: "North Campus",
      totalFees: 13500.0,
      paidAmount: 6750.0,
      pendingAmount: 6750.0,
      dueDate: "2024-05-15",
      status: "Partial",
      lastPayment: "2024-03-20",
      discount: 0,
      sponsor: "Education Trust",
    },
    {
      id: "1004",
      studentId: 1004,
      name: "Emily Williams",
      grNo: "5026",
      class: "Grade 11",
      campus: "Main Campus",
      totalFees: 13500.0,
      paidAmount: 0.0,
      pendingAmount: 13500.0,
      dueDate: "2024-05-15",
      status: "Unpaid",
      lastPayment: null,
      discount: 0,
      sponsor: null,
    },
    {
      id: "1005",
      studentId: 1005,
      name: "David Brown",
      grNo: "5027",
      class: "Grade 12",
      campus: "North Campus",
      totalFees: 15000.0,
      paidAmount: 7500.0,
      pendingAmount: 7500.0,
      dueDate: "2024-05-15",
      status: "Partial",
      lastPayment: "2024-04-01",
      discount: 15,
      sponsor: "Alumni Foundation",
    },
  ];

  const toggleSelectAll = () => {
    if (selectedStudents.length === studentFees.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(studentFees.map((student) => student.id));
    }
  };

  const toggleSelectStudent = (id: string) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(
        selectedStudents.filter((studentId) => studentId !== id)
      );
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "Partial":
        return <Badge className="bg-yellow-500">Partial</Badge>;
      case "Unpaid":
        return <Badge color="destructive">Unpaid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Student Fee Details</CardTitle>
            <CardDescription>
              Comprehensive view of all student fees and payment status
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or GR number..."
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campuses</SelectItem>
                  <SelectItem value="main">Main Campus</SelectItem>
                  <SelectItem value="north">North Campus</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedStudents.length === studentFees.length &&
                        studentFees.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class/Campus</TableHead>
                  <TableHead>Total Fees</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Sponsor</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentFees.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => toggleSelectStudent(student.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt={student.name}
                          />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-muted-foreground">
                            ID: {student.studentId} | GR: {student.grNo}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{student.class}</div>
                      <div className="text-xs text-muted-foreground">
                        {student.campus}
                      </div>
                    </TableCell>
                    <TableCell>${student.totalFees.toFixed(2)}</TableCell>
                    <TableCell className="text-green-600">
                      ${student.paidAmount.toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={
                        student.pendingAmount > 0
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      ${student.pendingAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {new Date(student.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>
                      {student.discount > 0 ? (
                        <Badge variant="outline" className="bg-purple-100">
                          {student.discount}%
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {student.sponsor ? (
                        <span className="text-sm">{student.sponsor}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Printer className="mr-2 h-4 w-4" />
                                <span>Print Voucher</span>
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Print Fee Voucher</DialogTitle>
                                <DialogDescription>
                                  Select voucher options for {student.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Voucher Month</Label>
                                  <Select defaultValue="5">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="5">
                                        May 2024
                                      </SelectItem>
                                      <SelectItem value="6">
                                        June 2024
                                      </SelectItem>
                                      <SelectItem value="7">
                                        July 2024
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Include Details</Label>
                                  <div className="flex flex-col space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id="breakdown" defaultChecked />
                                      <Label htmlFor="breakdown">
                                        Fee Breakdown
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id="payment-history" />
                                      <Label htmlFor="payment-history">
                                        Payment History
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id="adjustments"
                                        defaultChecked
                                      />
                                      <Label htmlFor="adjustments">
                                        Adjustments & Discounts
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>
                                  <Printer className="mr-2 h-4 w-4" />
                                  Print Voucher
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Percent className="mr-2 h-4 w-4" />
                                <span>Apply Discount</span>
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Apply Fee Discount</DialogTitle>
                                <DialogDescription>
                                  Apply a discount to {student.name}'s fees
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="discount-type">
                                    Discount Type
                                  </Label>
                                  <Select defaultValue="percentage">
                                    <SelectTrigger id="discount-type">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="percentage">
                                        Percentage
                                      </SelectItem>
                                      <SelectItem value="fixed">
                                        Fixed Amount
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="discount-value">
                                    Discount Value
                                  </Label>
                                  <div className="flex items-center">
                                    <Input
                                      id="discount-value"
                                      type="number"
                                      defaultValue={student.discount || 0}
                                      className="w-20 mr-2"
                                    />
                                    <span>%</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="discount-reason">
                                    Reason
                                  </Label>
                                  <Select
                                    defaultValue={
                                      student.discount > 0 ? "sibling" : "merit"
                                    }
                                  >
                                    <SelectTrigger id="discount-reason">
                                      <SelectValue placeholder="Select reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="sibling">
                                        Sibling Discount
                                      </SelectItem>
                                      <SelectItem value="merit">
                                        Merit Scholarship
                                      </SelectItem>
                                      <SelectItem value="financial">
                                        Financial Hardship
                                      </SelectItem>
                                      <SelectItem value="special">
                                        Special Consideration
                                      </SelectItem>
                                      <SelectItem value="other">
                                        Other
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="discount-notes">Notes</Label>
                                  <Textarea
                                    id="discount-notes"
                                    placeholder="Additional notes about this discount"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Effective Period</Label>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-xs">From</Label>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal"
                                          >
                                            {date
                                              ? format(date, "PPP")
                                              : "Pick a date"}
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                          <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                    <div>
                                      <Label className="text-xs">To</Label>
                                      <Select defaultValue="academic-year">
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="academic-year">
                                            End of Academic Year
                                          </SelectItem>
                                          <SelectItem value="semester">
                                            End of Semester
                                          </SelectItem>
                                          <SelectItem value="custom">
                                            Custom Date
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Apply Discount</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <UserPlus className="mr-2 h-4 w-4" />
                                <span>Assign Sponsor</span>
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Assign Sponsor</DialogTitle>
                                <DialogDescription>
                                  Assign a sponsor to cover {student.name}'s
                                  fees
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="sponsor-type">
                                    Sponsor Type
                                  </Label>
                                  <Select
                                    defaultValue={
                                      student.sponsor
                                        ? "organization"
                                        : "individual"
                                    }
                                  >
                                    <SelectTrigger id="sponsor-type">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="individual">
                                        Individual
                                      </SelectItem>
                                      <SelectItem value="organization">
                                        Organization
                                      </SelectItem>
                                      <SelectItem value="government">
                                        Government
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="sponsor-name">
                                    Sponsor Name
                                  </Label>
                                  <Input
                                    id="sponsor-name"
                                    defaultValue={student.sponsor || ""}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="sponsor-contact">
                                    Contact Person
                                  </Label>
                                  <Input
                                    id="sponsor-contact"
                                    placeholder="Name of contact person"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="sponsor-email">Email</Label>
                                  <Input
                                    id="sponsor-email"
                                    type="email"
                                    placeholder="Email address"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="sponsor-phone">Phone</Label>
                                  <Input
                                    id="sponsor-phone"
                                    placeholder="Phone number"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="coverage-percentage">
                                    Coverage Percentage
                                  </Label>
                                  <div className="flex items-center">
                                    <Input
                                      id="coverage-percentage"
                                      type="number"
                                      defaultValue="100"
                                      className="w-20 mr-2"
                                    />
                                    <span>%</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="sponsor-notes">Notes</Label>
                                  <Textarea
                                    id="sponsor-notes"
                                    placeholder="Additional notes about this sponsorship"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Assign Sponsor</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 5 of 125 students
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {selectedStudents.length > 0 && (
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-background">
                {selectedStudents.length} students selected
              </Badge>
              <span className="text-sm text-muted-foreground">
                Bulk actions:
              </span>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Vouchers
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Print Multiple Vouchers</DialogTitle>
                    <DialogDescription>
                      Print fee vouchers for {selectedStudents.length} selected
                      students
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Voucher Month</Label>
                      <Select defaultValue="5">
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">May 2024</SelectItem>
                          <SelectItem value="6">June 2024</SelectItem>
                          <SelectItem value="7">July 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Print Format</Label>
                      <Select defaultValue="individual">
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">
                            Individual Vouchers
                          </SelectItem>
                          <SelectItem value="consolidated">
                            Consolidated Report
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-details" defaultChecked />
                      <Label htmlFor="include-details">
                        Include Fee Breakdown
                      </Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>
                      <Printer className="mr-2 h-4 w-4" />
                      Print Vouchers
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Percent className="mr-2 h-4 w-4" />
                    Apply Discount
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply Bulk Discount</DialogTitle>
                    <DialogDescription>
                      Apply discount to {selectedStudents.length} selected
                      students
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="bulk-discount-type">Discount Type</Label>
                      <Select defaultValue="percentage">
                        <SelectTrigger id="bulk-discount-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bulk-discount-value">
                        Discount Value
                      </Label>
                      <div className="flex items-center">
                        <Input
                          id="bulk-discount-value"
                          type="number"
                          defaultValue="10"
                          className="w-20 mr-2"
                        />
                        <span>%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bulk-discount-reason">Reason</Label>
                      <Select defaultValue="group">
                        <SelectTrigger id="bulk-discount-reason">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="group">Group Discount</SelectItem>
                          <SelectItem value="special">
                            Special Promotion
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bulk-discount-notes">Notes</Label>
                      <Textarea
                        id="bulk-discount-notes"
                        placeholder="Additional notes about this discount"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Apply to Selected</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Assign Sponsor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Bulk Sponsorship</DialogTitle>
                    <DialogDescription>
                      Assign a sponsor to {selectedStudents.length} selected
                      students
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="bulk-sponsor-type">Sponsor Type</Label>
                      <Select defaultValue="organization">
                        <SelectTrigger id="bulk-sponsor-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="organization">
                            Organization
                          </SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bulk-sponsor-name">Sponsor Name</Label>
                      <Input
                        id="bulk-sponsor-name"
                        placeholder="Name of sponsor"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bulk-coverage-percentage">
                        Coverage Percentage
                      </Label>
                      <div className="flex items-center">
                        <Input
                          id="bulk-coverage-percentage"
                          type="number"
                          defaultValue="100"
                          className="w-20 mr-2"
                        />
                        <span>%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bulk-sponsor-notes">Notes</Label>
                      <Textarea
                        id="bulk-sponsor-notes"
                        placeholder="Additional notes about this sponsorship"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Assign to Selected</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Send Reminders
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Fee Summary</CardTitle>
            <CardDescription>Overview of fee collection status</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Total Fees
              </div>
              <div className="text-2xl font-bold">$67,000.00</div>
              <div className="text-xs text-muted-foreground mt-1">
                Academic Year 2023-2024
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Collected
              </div>
              <div className="text-2xl font-bold text-green-600">
                $34,250.00
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                51.1% of total fees
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Outstanding
              </div>
              <div className="text-2xl font-bold text-red-600">$32,750.00</div>
              <div className="text-xs text-muted-foreground mt-1">
                Due by May 15, 2024
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Alerts & Notifications</h3>
            <div className="space-y-3">
              <div className="rounded-md bg-yellow-50 p-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Payment Due Soon
                    </h3>
                    <div className="mt-1 text-sm text-yellow-700">
                      45 students have payments due within the next 7 days.
                    </div>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                      >
                        Send Reminders
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-red-50 p-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Overdue Payments
                    </h3>
                    <div className="mt-1 text-sm text-red-700">
                      12 students have overdue payments exceeding 30 days.
                    </div>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                      >
                        View Overdue List
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
