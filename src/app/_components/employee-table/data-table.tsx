"use client";

import * as React from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type Employee } from "@prisma/client";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleStatus: (row: Employee) => void; // Add a new prop for editing a row
  handleEdit: (row: Employee) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleStatus,
  handleEdit,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  // Append the edit button column definition to the columns
  const columnsWithEditButton = React.useMemo(() => {
    return [
      ...columns,
      {
        id: "edit",
        header: "Actions",
        cell: ({ row }: { row: { original: Employee } }) => (
          <div className="flex justify-between gap-6">
            <button
              onClick={() => handleStatus(row.original)} // Call handleStatus with the original row data
              className={`${row.original.status === "Active" ? "text-red-500 hover:text-red-600" : "text-green-500 hover:text-green-600"}`}
            >
              {row.original.status === "Active" ? "Deactivate" : "Activate"}
            </button>
            <button
              onClick={() => handleEdit(row.original)} // Call handleEdit with the original row data
              className="text-blue-500 hover:text-blue-600"
            >
              Edit
            </button>
          </div>
        ),
      },
    ] as ColumnDef<TData, unknown>[];
  }, [columns, handleStatus]);

  const table = useReactTable({
    data,
    columns: columnsWithEditButton,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-end py-4">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={handleSearchChange}
          className="w-30"
        />
      </div>
      <div className="rounded-md border border-black px-4 py-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
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
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
