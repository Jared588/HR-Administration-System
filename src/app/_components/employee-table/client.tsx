// Client Component: ClientDataTable.tsx
"use client";

import { useState } from "react";
import { type Employee } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface ClientDataTableProps {
  data: Employee[];
}

export function ClientDataTable({ data }: ClientDataTableProps) {
  const [employees, setEmployees] = useState<Employee[]>(data);

  const handleEditRow = (row: Employee) => {
    const updatedData = employees.map((employee) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (employee.id === row.id) {
        // Toggle the status between "Active" and "Inactive"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
          ...employee,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          status: employee.status === "Active" ? "Inactive" : "Active",
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return employee;
    });

    setEmployees(updatedData); // Update the state with modified data
  };

  return (
    <div className="container mx-auto">
      <DataTable
        columns={columns}
        data={employees}
        onEditRow={handleEditRow}
      />
    </div>
  );
}
