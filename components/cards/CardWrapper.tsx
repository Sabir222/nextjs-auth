"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "@/public/authentication.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type CardWrapperProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  redirect?: "SignIn" | "SignUp";
  question: string;
  modal: boolean;
};

const CardWrapper = ({
  children,
  title,
  description,
  question,
  redirect,
}: CardWrapperProps) => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };
  const router = useRouter();
  const handleQuestionClick = () => {
    if (redirect === "SignIn") {
      router.push("/auth/signin");
    } else if (redirect === "SignUp") {
      router.push("/auth/signup");
    } else {
    }
  };
  return (
    <Card className="relative max-w-[450px] w-full mx-4">
      <div className="text-base flex p-6 justify-center items-center gap-4">
        <Image src={Logo} alt="logo" className="w-6" />
        <h1 className="drop-shadow-md"> Next Auth v5</h1>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex gap-x-2 w-full">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => onClick("google")}
          >
            <FcGoogle className="mr-2" />
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={() => onClick("github")}
          >
            <FaGithub className="mr-2" />
            Github
          </Button>
        </div>
        <h1 className="text-gray-600 text-sm">
          {question},{" "}
          <Button
            onClick={() => handleQuestionClick()}
            variant="ghost"
            className="hover:bg-transparent px-0 underline text-black dark:text-white"
          >
            {redirect}
          </Button>
        </h1>
      </CardFooter>
    </Card>
  );
};
export default CardWrapper;
