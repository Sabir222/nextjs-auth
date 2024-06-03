"use client";
import { newVerificationToken } from "@/actions/verification";
import { useSearchParams } from "next/navigation";
import { useEffect, useCallback, useState, Suspense } from "react";
import MessageAuth from "./cards/Error-auth";

type Message = {
  error: string | undefined;
  success: string | undefined;
};
const Verification = () => {
  const [message, setMessage] = useState<Message>({
    error: undefined,
    success: undefined,
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (!token) {
      setMessage({ error: "No token provided", success: undefined });
      return;
    }
    newVerificationToken(token)
      .then((res) => {
        const result = res || { error: "Unexpected error", success: undefined };
        setMessage({ error: result.error, success: result.success });
      })
      .catch(() => {
        setMessage({ error: "Something went wrong", success: undefined });
      });
  }, [token]);

  useEffect(() => {
    if (token) {
      onSubmit();
    }
  }, [token, onSubmit]);
  return (
    <Suspense>
      <div className="w-full  min-h-[100vh] h-full flex justify-center items-center">
        Verifiying the token: {token}
        <MessageAuth
          message={message.error || message.success}
          type={message.error ? "error" : "success"}
        />
      </div>
    </Suspense>
  );
};

export default Verification;
