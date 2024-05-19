"use client";
import { ModeToggle } from "./Toggle";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 right-0 left-0 h-14  border-b-black/20 dark:border-b-white/10 border-b-[0.5px] p-2 ">
      <main className="max-w-7xl mx-auto  flex ">
        <div className="flex items-center gap-4 ml-auto">
          <Button variant="outline" onClick={() => router.push("/auth/signin")}>
            Sign-In
          </Button>
          <Button onClick={() => router.push("/auth/signup")}>Sign-Up</Button>
          <ModeToggle />
        </div>
      </main>
    </nav>
  );
};

export default NavBar;
