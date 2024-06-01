import { auth } from "@/auth";
import NavBar from "@/components/navbar/Navbar";
import SignOutBtn from "@/components/navbar/SignOutButton";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <main className="flex justify-center items-center h-full">
      <NavBar />
      <div>
        <h1 className="drop-shadow-lg space-y-6 text-5xl text-center">
          Not Authenticated -{JSON.stringify(session)}
        </h1>
        <SignOutBtn />
      </div>
    </main>
  );
}
