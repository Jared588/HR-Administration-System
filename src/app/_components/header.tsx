export default function Header() {
  return (
    <div className="flex w-full border-b border-black p-6">
      <button>
        <svg
          className="w-10 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>menu</title>
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </button>
      <h1 className="text-4xl">HR Administration System</h1>
    </div>
  );
}
