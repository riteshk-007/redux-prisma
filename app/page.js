import Link from "next/link";
import AllUser from "./alluser/page";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <Link
        href="/adduser"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Add User
      </Link>
      <AllUser />
    </main>
  );
}
