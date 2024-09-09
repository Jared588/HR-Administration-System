// Client Component: ClientDataTable.tsx
"use client";

import { useState } from "react";
import { type Department } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { api } from "~/trpc/react";

interface ClientDataTableProps {
  data: Department[];
}

export function ClientDataTable({ data }: ClientDataTableProps) {
  const [departments, setDepartments] = useState<Department[]>(data);
  const utils = api.useUtils();
  
  const updateDepartmentMutation = api.department.updateStatus.useMutation({
    onSuccess: () => {
      // Optionally, refetch or invalidate queries if needed
      void utils.department.getAll.invalidate(); // Make sure to define this procedure
    },
  });

  const handleEditRow = async (row: Department) => {
    const newStatus = row.status === "Active" ? "Inactive" : "Active";

    // Optimistically update the UI
    const updatedData = departments.map((department) =>
      department.id === row.id ? { ...department, status: newStatus } : department
    );
    setDepartments(updatedData);

    // Call the tRPC mutation
    try {
      await updateDepartmentMutation.mutateAsync({ id: row.id, status: newStatus });
    } catch (error) {
      // Optionally handle errors
      console.error("Failed to update department status:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <DataTable
        columns={columns}
        data={departments}
        onEditRow={handleEditRow}
      />
    </div>
  );
}
