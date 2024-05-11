import { ModeToggle } from "./Toggle";

const NavBar = () => {
  return (
    <nav className="fixed right-0 left-0 h-14  border-b-black/20 dark:border-b-white/10 border-b-[0.5px] p-2">
      <main className="max-w-7xl mx-auto ">
        <ModeToggle />
      </main>
    </nav>
  );
};

export default NavBar;
