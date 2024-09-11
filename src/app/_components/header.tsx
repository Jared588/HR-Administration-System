import DropDownMenu from "./dropdown-menu";

export default function Header() {
  return (
    <div className="flex w-full border-b border-black p-6">
      <DropDownMenu />
      <h1 className="text-4xl">HR Administration System</h1>
    </div>
  );
}
