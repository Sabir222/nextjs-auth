import NavBar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-full">
      <NavBar />
      <div>
        <h1 className="drop-shadow-lg space-y-6 text-5xl text-center">
          Not Authenticated
        </h1>
      </div>
    </main>
  );
}
