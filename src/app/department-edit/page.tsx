import Header from "../_components/header";
import { EditForm } from "../_components/department-edit-form";

export default function DepartmentEdit() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex flex-col w-2/3">
        <h1 className="py-4 text-2xl">Edit Department</h1>
        <EditForm />
      </div>
    </div>
  );
}
