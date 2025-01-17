"use client";
import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {MoreHorizontal, PlusCircle, RotateCw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export type CompanyHR = {
    id: number;
    fullName: string;
    email: string;
    phoneNumber?: string;
    department: "HR";
    designation:
        | "HR Assistant"
        | "HR Executive"
        | "HR Generalist"
        | "HR Specialist"
        | "HR Coordinator"
        | "HR Manager"
        | "HR Business Partner"
        | "Recruitment Manager"
        | "Training and Development Manager"
        | "HR Consultant"
        | "HR Director";
    status: "active" | "inactive";
};

const data: CompanyHR[] = [
    {
        id: 1,
        fullName: "Alice Johnson",
        email: "alice.johnson@example.com",
        phoneNumber: "9876543210",
        department: "HR",
        designation: "HR Manager",
        status: "active",
    },
    {
        id: 2,
        fullName: "Bob Smith",
        email: "bob.smith@example.com",
        phoneNumber: "8765432109",
        department: "HR",
        designation: "HR Executive",
        status: "active",
    },
    {
        id: 3,
        fullName: "Catherine Williams",
        email: "catherine.williams@example.com",
        phoneNumber: "7654321098",
        department: "HR",
        designation: "Recruitment Manager",
        status: "inactive",
    },
    {
        id: 4,
        fullName: "Daniel Brown",
        email: "daniel.brown@example.com",
        phoneNumber: "6543210987",
        department: "HR",
        designation: "HR Consultant",
        status: "active",
    },
    {
        id: 5,
        fullName: "Evelyn Davis",
        email: "evelyn.davis@example.com",
        phoneNumber: "5432109876",
        department: "HR",
        designation: "HR Specialist",
        status: "active",
    },
    {
        id: 6,
        fullName: "Frank Harris",
        email: "frank.harris@example.com",
        phoneNumber: "4321098765",
        department: "HR",
        designation: "Training and Development Manager",
        status: "inactive",
    },
    {
        id: 7,
        fullName: "Grace Lee",
        email: "grace.lee@example.com",
        phoneNumber: "3210987654",
        department: "HR",
        designation: "HR Coordinator",
        status: "active",
    },
    {
        id: 8,
        fullName: "Henry Martinez",
        email: "henry.martinez@example.com",
        phoneNumber: "2109876543",
        department: "HR",
        designation: "HR Business Partner",
        status: "active",
    },
    {
        id: 9,
        fullName: "Isabella Garcia",
        email: "isabella.garcia@example.com",
        phoneNumber: "1098765432",
        department: "HR",
        designation: "HR Generalist",
        status: "active",
    },
    {
        id: 10,
        fullName: "Jack Wilson",
        email: "jack.wilson@example.com",
        phoneNumber: "0987654321",
        department: "HR",
        designation: "HR Assistant",
        status: "inactive",
    },
];

const columns: ColumnDef<CompanyHR>[] = [
    {
        accessorKey: "id",
        header: "Employee ID",
        cell: ({row}) => <div>{row.getValue("id")}</div>,
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({row}) => <div>{row.getValue("fullName")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => <div>{row.getValue("email")}</div>,
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        cell: ({row}) => <div>{row.getValue("phoneNumber") || "N/A"}</div>,
    },
    {
        accessorKey: "designation",
        header: "Designation",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("designation")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <div
                className={`capitalize ${
                    row.getValue("status") === "active" ? "text-green-700 bg-green-200 rounded-full px-1 py-1 text-center" : "text-red-700  bg-red-300 rounded-full px-1 py-1 text-center"
                }`}
            >
                {row.getValue("status")}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link href={
                                `/employees/edit/${row.getValue("id")}?editable=false`
                            }>View detail</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/employees/edit/${row.getValue("id")}?editable=true`}>Edit
                            detail</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const DataTable = () => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <ScrollArea className="w-full whitespace-nowrap px-2">
            <div className="w-full">
                {/* head form */}
                <div className="flex items-center justify-between py-2">
                    <div className="w-full max-w-xs">
                        <Input
                            placeholder="Enter employee name"
                            value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("fullName")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    </div>
                    <div className="flex justify-end gap-2 w-full max-w-sm">
                        <Link href={"/employees/add"}>
                            <Button type="button" className="" variant="outline">
                                <PlusCircle size={15}/>
                                <span>Add</span>
                            </Button>
                        </Link>
                        <Button type="button" className="" variant="outline">
                            <RotateCw size={15}/>
                            <span>Refresh</span>
                        </Button>
                    </div>
                </div>
                {/* data form */}
                <div className="rounded-md border">
                    <Table className="w-full overflow-auto">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="text-nowrap">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="whitespace-nowrap">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {/* pagination form */}
                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {table.getRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} records
                    </div>
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                className=" p-2"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <span>Previous</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="p-2"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <span>Next</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};

export default DataTable;
