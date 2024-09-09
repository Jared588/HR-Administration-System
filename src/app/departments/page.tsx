import { FilterForm } from "../_components/department-table/filter-form";
import DepartmentTable from "../_components/department-table/page";
import Header from "../_components/header";

export default function DepartmentList() {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Header />
      <div className="md:w-2/3">
        <h1 className="text-2xl py-4">Departments</h1>
        <div className="flex w-full flex-col items-center rounded-md border border-black p-4 mb-10">
          <h2 className="self-start">Filters</h2>
          <FilterForm />
        </div>
        <DepartmentTable />
      </div>
    </div>
  );
}
