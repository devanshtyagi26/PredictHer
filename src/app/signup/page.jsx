"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.userName.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="userName">userName</label>
      <input
        type="text"
        id="userName"
        value={user.userName}
        onChange={(e) => {
          setUser({ ...user, userName: e.target.value });
        }}
        placeholder="userName"
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="password"
      />
      <button onClick={onSignup}>
        {buttonDisabled ? "Fill the form" : "Signup"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}

export default SignUpPage;
