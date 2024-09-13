import EmployeeTable from "../_components/employee-table/page";
import Header from "../_components/header";

export default function EmployeeList() {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Header />
      <div className="md:w-2/3">
        <h1 className="text-2xl py-4">Employees</h1>
        <EmployeeTable />
      </div>
    </div>
  );
}
