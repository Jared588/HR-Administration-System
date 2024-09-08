import { FilterForm } from "../_components/filter-form";

export default function EmployeeList() {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <h1>Employees</h1>
      <div className="flex w-full flex-col items-center border border-black p-6 md:w-3/5">
        <h2 className="self-start">Filters</h2>
        <FilterForm />
      </div>
      <div>
        <div>
          <p>Show per page</p>
          <input type="text" className="border border-black" />
        </div>
        <input type="search" name="employee-search" id="employee-search" />
        <table></table>
      </div>
    </div>
  );
}
