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

export type Vacancies = {
    id: number;
    title: string;
    department: string;
    role: string;
    employmentType: string;
    vacanciesCount: number;
    status: string;
};

const data: Vacancies[] = [
    {
        id: 1,
        title: "Software Engineer",
        department: "Engineering",
        role: "Backend Developer",
        employmentType: "Full-time",
        vacanciesCount: 5,
        status: "Open",
    },
    {
        id: 2,
        title: "Product Manager",
        department: "Product",
        role: "Lead Product Manager",
        employmentType: "Full-time",
        vacanciesCount: 2,
        status: "Open",
    },
    {
        id: 3,
        title: "HR Specialist",
        department: "Human Resources",
        role: "Recruiter",
        employmentType: "Part-time",
        vacanciesCount: 3,
        status: "Closed",
    },
    {
        id: 4,
        title: "Data Scientist",
        department: "Data Science",
        role: "Senior Data Analyst",
        employmentType: "Contract",
        vacanciesCount: 1,
        status: "Open",
    },
    {
        id: 5,
        title: "Marketing Manager",
        department: "Marketing",
        role: "Brand Strategist",
        employmentType: "Full-time",
        vacanciesCount: 4,
        status: "Open",
    },
    {
        id: 6,
        title: "DevOps Engineer",
        department: "Engineering",
        role: "Cloud Engineer",
        employmentType: "Full-time",
        vacanciesCount: 2,
        status: "Open",
    },
    {
        id: 7,
        title: "Product Designer",
        department: "Design",
        role: "UX/UI Designer",
        employmentType: "Full-time",
        vacanciesCount: 3,
        status: "Open",
    },
    {
        id: 8,
        title: "Data Engineer",
        department: "Engineering",
        role: "Data Integration Specialist",
        employmentType: "Full-time",
        vacanciesCount: 1,
        status: "Closed",
    },
    {
        id: 9,
        title: "Software Architect",
        department: "Engineering",
        role: "System Architect",
        employmentType: "Full-time",
        vacanciesCount: 1,
        status: "Open",
    },
    {
        id: 10,
        title: "Sales Manager",
        department: "Sales",
        role: "Regional Sales Manager",
        employmentType: "Full-time",
        vacanciesCount: 2,
        status: "Open",
    },
    {
        id: 11,
        title: "Marketing Coordinator",
        department: "Marketing",
        role: "Digital Marketing Specialist",
        employmentType: "Part-time",
        vacanciesCount: 5,
        status: "Closed",
    },
    {
        id: 12,
        title: "Business Analyst",
        department: "Operations",
        role: "Process Improvement Specialist",
        employmentType: "Contract",
        vacanciesCount: 2,
        status: "Open",
    },
    {
        id: 13,
        title: "Customer Support Specialist",
        department: "Customer Service",
        role: "Customer Success Manager",
        employmentType: "Full-time",
        vacanciesCount: 10,
        status: "Open",
    },
    {
        id: 14,
        title: "Financial Analyst",
        department: "Finance",
        role: "Budget Analyst",
        employmentType: "Full-time",
        vacanciesCount: 3,
        status: "Open",
    },
    {
        id: 15,
        title: "Legal Counsel",
        department: "Legal",
        role: "Corporate Counsel",
        employmentType: "Full-time",
        vacanciesCount: 1,
        status: "Open",
    },
];


const columns: ColumnDef<Vacancies>[] = [
    {
        accessorKey: "id",
        header: "Vacancy ID",
        cell: ({row}) => <div>{row.getValue("id")}</div>,
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({row}) => <div>{row.getValue("title")}</div>,
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({row}) => <div>{row.getValue("department")}</div>,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({row}) => <div>{row.getValue("role")}</div>,
    },
    {
        accessorKey: "employmentType",
        header: "Employment type",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("employmentType")}</div>
        ),
    },
    {
        accessorKey: "vacanciesCount",
        header: "Vacancies",
        cell: ({row}) => (
            <div>{row.getValue("vacanciesCount")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            const status = row.getValue("status");
            let statusClass = "";

            if (status === "Open") {
                statusClass = "text-green-700 bg-green-200";
            } else if (status === "Closed") {
                statusClass = "text-red-700 bg-red-300";
            } else if (status === "On-Hold") {
                statusClass = "text-orange-700 bg-orange-200";
            }

            return (
                <div className={`capitalize ${statusClass} rounded-full px-2 py-1 text-center`}>
                    {String(status)}
                </div>
            );
        },
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
                                `/vacancies/view/${row.getValue("id")}`
                            }>View detail</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href={`/vacancies/edit/${row.getValue("id")}`}>Edit
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
                            placeholder="Enter Job title"
                            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    </div>
                    <div className="flex justify-end gap-2 w-full max-w-sm">
                        <Link href={"/vacancies/create"}>
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
            <ScrollBar orientation="horizontal"/>
        </ScrollArea>
    )
}
export default DataTable
