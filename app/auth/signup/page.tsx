import SignUpCard from "@/components/cards/SignUpCard";
import { Suspense } from "react";

const Page = () => {
  return (
    <main className="h-full flex justify-center items-center">
      <Suspense>
        <SignUpCard />
      </Suspense>
    </main>
  );
};
export default Page;
