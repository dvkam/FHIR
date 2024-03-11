import { Link } from "wouter";

const Navigation = () => {
  return (
    <nav className="font-sans flex flex-col text-center border-b-2 border-zinc-50 sm:flex-row sm:text-left sm:justify-between py-4 px-6 shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <Link href="/" className="text-2xl no-underline hover:text-blue-dark">
          Home
        </Link>
      </div>
      <div>
        <Link
          href="/search"
          className="text-lg no-underline hover:text-blue-dark ml-2"
        >
          Search
        </Link>
      </div>
    </nav>
  );
};
export default Navigation;
