"use client";
import { useRouter } from "next/navigation";
import React from "react";

const LogInPage = () => {
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // form data se username or password get kren gy
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    // console.log("login :",username,password)

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const { accessToken } = await res.json();
    console.log(accessToken);
    if (accessToken) {
      router.push("/");
    } else {
      alert("Login Failed");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-4xl font-bold justify-center items-center flex m-6">
        JWT Token
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center m-4"
      >
        <label className="m-4">
          Username:
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border text-black outline-none rounded-lg px-2"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="password"
            className="border text-black outline-none rounded-lg px-2"
          />
        </label>
        <button
          type="submit"
          className="border m-4 bg-blue-300 rounded-lg px-3 py-2 hover:bg-black hover:text-white ease-in duration-300 hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LogInPage;
