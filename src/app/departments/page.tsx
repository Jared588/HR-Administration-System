import DepartmentTable from "../_components/department-table/page";
import Header from "../_components/header";

export default function DepartmentList() {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Header />
      <div className="md:w-2/3">
        <h1 className="text-2xl py-4">Departments</h1>
        <DepartmentTable />
      </div>
    </div>
  );
}
