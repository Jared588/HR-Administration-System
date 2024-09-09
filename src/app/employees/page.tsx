import { FilterForm } from "../_components/filter-form";
import EmployeeTable from "../_components/employee-table/page";
import Header from "../_components/header";

export default function EmployeeList() {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Header />
      <div className="md:w-2/3">
        <h1 className="text-2xl py-4">Employees</h1>
        <div className="flex w-full flex-col items-center rounded-md border border-black p-4 mb-10">
          <h2 className="self-start">Filters</h2>
          <FilterForm />
        </div>
        <EmployeeTable />
      </div>
    </div>
  );
}
