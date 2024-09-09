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
  onEditRow: (row: Employee) => void; // Add a new prop for editing a row
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onEditRow,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  // Append the edit button column definition to the columns
  const columnsWithEditButton = React.useMemo(() => {
    return [
      ...columns,
      {
        id: 'edit',
        header: 'Actions',
        cell: ({ row }: { row: { original: Employee } }) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditRow(row.original)} // Call onEditRow with the original row data
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            className={`${row.original.status === "Active" ? "text-red-500 hover:text-red-600" : "text-green-500 hover:text-green-600"}`}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
            {row.original.status === "Active" ? "Deactivate" : "Activate"}
          </Button>
        ),
      },
    ] as ColumnDef<TData, unknown>[];
  }, [columns, onEditRow]);

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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
