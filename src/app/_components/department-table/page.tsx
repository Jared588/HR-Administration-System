import { PrismaClient, type Department } from "@prisma/client";
import { ClientDataTable } from "./client";

const prisma = new PrismaClient();

async function getData(): Promise<Department[]> {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: "asc"}
    });
    return departments;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
}

export default async function DepartmentTable() {
  const data = await getData();

  return (
    <div className="container mx-auto">
      <ClientDataTable data={data} />
    </div>
  );
}
