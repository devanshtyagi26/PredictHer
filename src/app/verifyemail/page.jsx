"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyEmail() {
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token");
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h1>Verify Email</h1>
      <hr />
      <h2>{token ? `${token}` : "no token"}</h2>
      {verified && (
        <>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </>
      )}
      {error && (
        <>
          <h2>Error</h2>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;
