"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("0");

  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/users/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data.data.uuid);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>
        {data === "0" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button onClick={logout}>Logout</button>
      <button onClick={getUserDetails}>Get User Details</button>
    </div>
  );
}
