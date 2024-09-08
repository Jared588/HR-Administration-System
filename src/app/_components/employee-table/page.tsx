import { PrismaClient, type Employee } from "@prisma/client"; 
import { columns } from "./columns";
import { DataTable } from "./data-table";

const prisma = new PrismaClient();

async function getData(): Promise<Employee[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const employees = (await prisma.employee.findMany()) as Employee[];
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
