import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

export default async function DropDownMenu() {
  const session = await getServerAuthSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <svg
          className="mr-4 w-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>menu</title>
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session?.user.type}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session?.user.type === "Admin" && (
          <>
            <DropdownMenuItem>
              <Link href={"/employees"}>View Employees</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/employee-create"}>Create Employee</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/departments"}>View Departments</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/department-create"}>Create Department</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/api/auth/signout"}>Sign out</Link>
            </DropdownMenuItem>
          </>
        )}
        {session?.user.type === "Manager" && (
          <>
            <DropdownMenuItem>
              <Link href={"/employees"}>View Employees</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/api/auth/signout"}>Sign out</Link>
            </DropdownMenuItem>
          </>
        )}
        {session?.user.type === "Employee" && (
          <>
            <DropdownMenuItem>Edit Profile</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/api/auth/signout"}>Sign out</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
