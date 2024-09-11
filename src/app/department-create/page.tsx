import Header from "../_components/header";
import { CreateForm } from "../_components/department-create-form";

export default function DepartmentCreate() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex flex-col w-2/3">
        <h1 className="py-4 text-2xl">Create Department</h1>
        <CreateForm />
      </div>
    </div>
  );
}
