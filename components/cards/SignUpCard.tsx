"use client";
import CardWrapper from "./CardWrapper";
import { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/actions/signUp";
import MessageAuth from "./Error-auth";
import { SignUpSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";
type Message = {
  error: string | undefined;
  success: string | undefined;
};
const SignUpCard = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<Message>({
    error: undefined,
    success: undefined,
  });
  useEffect(() => {
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      setMessage({
        error: "This account is already linked to another user",
        success: undefined,
      });
    }
  }, [searchParams]);
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    startTransition(() => {
      signUp(values).then((res) => {
        setMessage({ error: res.error, success: res.sucess });
      });
    });
  }

  return (
    <CardWrapper
      title="Sign-Up"
      description="Create you account now"
      question="You already have an account?"
      redirect="SignIn"
      modal={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            disabled={isPending}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            disabled={isPending}
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="confirm password"
                    {...field}
                  />
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
            className="w-full "
            disabled={isPending}
          >
            Sign-Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignUpCard;
