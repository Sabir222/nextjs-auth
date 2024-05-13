import React from "react";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="h-full">{children}</main>
    </>
  );
}
