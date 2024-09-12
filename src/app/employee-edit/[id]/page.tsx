import Header from "../../_components/header";
import { EditForm } from "../../_components/employee-edit-form";
import { getServerAuthSession } from "~/server/auth";

export default async function EmployeeEdit({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex w-2/3 flex-col">
        <h1 className="py-4 text-2xl">Edit Employee</h1>
        {session?.user.id ? <EditForm id={params.id} /> : null}
      </div>
    </div>
  );
}
