# NextAuth 5 Full Functionalities

This repository contains the implementation of all functionalities of NextAuth 5 with Next.js.

## Getting Started

First, let's set up the project by creating the login and signup models.

### Step 1: Create the SignIn and SignUp Forms

To get started, install the necessary packages:

```bash
npm install react-hook-form zod
```

> 💡 **Note:** I used shadcn Components in this example;feel free to use Components you prefer.

- Sign In Card.

```typescript

"use client";
import CardWrapper from "./CardWrapper";
import { z } from "zod";
import { useState, useTransition } from "react";
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
import { signIn } from "@/actions/signIn";
import MessageAuth from "./Error-auth";

type Message = {
  error: string | undefined;
  success: string | undefined;
};
const SignInCard = () => {
  const [isPending, startTransition] = useTransition();
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

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    startTransition(() => {
      signIn(values).then((res) => {
        setMessage({ error: res.error, success: res.sucess });
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
```

- Sign Up Card.

```typescript

"use client";
import CardWrapper from "./CardWrapper";
import { useState, useTransition } from "react";
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

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirm: z.string(),
    email: z.string().email({ message: "Use a valid email" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
type Message = {
  error: string | undefined;
  success: string | undefined;
};
const SignUpCard = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<Message>({
    error: undefined,
    success: undefined,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
            name="username"
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
```

Add zod schemas in schemas/index.ts.

```ts
import * as z from "zod";

export const SignInSchema = z.object({
  password: z.string().min(6),
  email: z.string().email({ message: "Use a valid email" }),
});

export const SignUpSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirm: z.string(),
    email: z.string().email({ message: "Use a valid email" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
```

We use server actions to to validate form input and handle Auth.

- actions/signUp.ts

```ts
"use server";

import { SignUpSchema } from "@/schemas";
import * as z from "zod";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  return { sucess: "Valid Fields" };
};
```

- actions/signIn.ts

```ts
"use server";

import { SignInSchema } from "@/schemas";
import * as z from "zod";

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  return { sucess: "Valid Fields" };
};
```

### Step 2: Setup Prisma

Install the necessary packages:

```bash
npm i -D prisma @types/bcrypt
```

```bash
npm i @prisma/client bcrypt
```

Add .env file.

```plaintext
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

Add libs/db.ts.

```ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;
```

Init prisma file.

```bash
npx prisma init
```

This command will generate a primsa/schema.prisma

```prisma

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  ADMIN
  USER
}

model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  name          String?
  password      String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  role          UserRole  @default(USER)
}

model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.String
  access_token      String? @db.String
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.String
  session_state     String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```

Run prisma generate.

```bash
npx prisma generate
```

Then push to the database.

```bash
npx prisma db push
```

### Step 3: Adding NextAuth

Install necessary packages.

> 💡 **Note:** NextAuth 5 is in Beta now in the future you will install NextAuth5+ only using npm i next-auth.

```bash
npm install next-auth@beta
```

```bash
npm i @auth/prisma-adapter
```

Start by creating a new auth.ts file at the root of your app with the following content.

```ts
//.auth.ts
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
});
```

Add an Route Handler under /app/api/auth/[...nextauth]/route.ts.

```ts
//./app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
```

Add optional Middleware to keep the session alive, this will update the session expiry every time its called.

```ts
//./middleware.ts
export { auth as middleware } from "@/auth";
```
