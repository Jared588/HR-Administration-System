// Client Component: ClientDataTable.tsx
"use client";

import { useState } from "react";
import { type Employee } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { api } from "~/trpc/react";

interface ClientDataTableProps {
  data: Employee[];
}

export function ClientDataTable({ data }: ClientDataTableProps) {
  const [employees, setEmployees] = useState<Employee[]>(data);
  const utils = api.useUtils();
  
  const updateEmployeeMutation = api.employee.updateStatus.useMutation({
    onSuccess: () => {
      // Optionally, refetch or invalidate queries if needed
      void utils.employee.getAll.invalidate(); // Make sure to define this procedure
    },
  });

  const handleEditRow = async (row: Employee) => {
    const newStatus = row.status === "Active" ? "Inactive" : "Active";

    // Optimistically update the UI
    const updatedData = employees.map((employee) =>
      employee.id === row.id ? { ...employee, status: newStatus } : employee
    );
    setEmployees(updatedData);

    // Call the tRPC mutation
    try {
      await updateEmployeeMutation.mutateAsync({ id: row.id, status: newStatus });
    } catch (error) {
      // Optionally handle errors
      console.error("Failed to update employee status:", error);
    }
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
