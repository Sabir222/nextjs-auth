"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
const ErrorCard = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full  flex items-center justify-center px-3 gap-3">
      <h1 className="text-3xl font-bold">Error: Something went Wrong</h1>
      <Button onClick={() => router.push("/auth/signin")}>Go to auth</Button>
    </div>
  );
};

export default ErrorCard;
