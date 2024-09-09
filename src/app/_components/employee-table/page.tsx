import { PrismaClient, type Employee } from "@prisma/client";
import { ClientDataTable } from "./client";

const prisma = new PrismaClient();

async function getData(): Promise<Employee[]> {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { firstName: "asc"}
    });
    return employees;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
}

export default async function EmployeeTable() {
  const data = await getData();

  return (
    <div className="container mx-auto">
      <ClientDataTable data={data} />
    </div>
  );
}
