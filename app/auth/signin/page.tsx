import SignInCard from "@/components/cards/SignInCard";
import { Suspense } from "react";

const Page = () => {
  return (
    <main className="h-full flex justify-center items-center">
      <Suspense>
        <SignInCard />
      </Suspense>
    </main>
  );
};
export default Page;
