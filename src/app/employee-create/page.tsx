import Header from "../_components/header";
import { CreateForm } from "../_components/employee-create-form";

export default function EmployeeCreate() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex flex-col w-2/3">
        <h1 className="py-4 text-2xl">Create Employee</h1>
        <CreateForm />
      </div>
    </div>
  );
}
