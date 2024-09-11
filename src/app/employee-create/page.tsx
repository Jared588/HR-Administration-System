import Header from "../_components/header";
import { EditForm } from "../_components/employee-edit-form";

export default function EmployeeCreate() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex flex-col w-2/3">
        <h1 className="py-4 text-2xl">Create Employee</h1>
        <EditForm />
      </div>
    </div>
  );
}
