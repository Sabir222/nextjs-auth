"use client";
import CardWrapper from "./CardWrapper";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SignInSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signin } from "@/actions/signIn";
import MessageAuth from "./Error-auth";
import { useSearchParams } from "next/navigation";

type Message = {
  error: string | undefined;
  success: string | undefined;
};
const SignInCard = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<Message>({
    error: undefined,
    success: undefined,
  });
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      setMessage({
        error: "This account is already linked to another user",
        success: undefined,
      });
    }
  }, [searchParams]);

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    startTransition(() => {
      signin(values).then((res) => {
        const result = res || { error: "Unexpected error", success: undefined };
        setMessage({ error: result.error, success: result.success });
      });
    });
  }

  return (
    <CardWrapper
      title="Sign-In"
      description="Use your Account credentials"
      question="You dont have an account?"
      redirect="SignUp"
      modal={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            disabled={isPending}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isPending}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <MessageAuth
            message={message.error || message.success}
            type={message.error ? "error" : "success"}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            Sign-In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default SignInCard;
