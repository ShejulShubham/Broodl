"use client";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import {
  checkEmailError,
  isValidEmail,
  checkPasswordError,
  isValidPassword,
} from "@/app/utils";
import { toastInfo, toastError, toastSuccess } from "@/app/toast_utils";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login } = useAuth();

  function defaultDetails() {
    toastInfo("Create your free account or Login with default account");
  }

  async function handleSubmit() {
    // add regex to email validation
    if (authenticating) {
      return;
    }

    if (!isValidEmail(email)) {
      let errorMessage = checkEmailError(email);
      toastError(errorMessage);
      return;
    } else if (!isValidPassword(password)) {
      let errorMessage = checkPasswordError(password);
      toastError(errorMessage);
      return;
    }

    setAuthenticating(true);

    try {
      let message = "";
      if (isRegister) {
        await signup(email, password);
        message = "Signed Up";
      } else {
        await login(email, password);
        message = "Logged In";
      }

      toastSuccess(`${message} successfully!`);
    } catch (error) {
      console.log(error.message);
      if (error.message == "Firebase: Error (auth/invalid-credential).") {
        toastError("Please Enter Valid Credentials");
      } else {
        toastError("Please try again after some time!");
      }
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
        {isRegister ? "Register" : "Log in"}
      </h3>
      <p>You&#39;re one step away!</p>
      {/* <div className="message">
        <p>
          Create your free account or Login with <strong>test@gmail.com</strong>{" "}
          and password as <strong>'password'</strong>
        </p>
      </div> */}
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py3 border border-solid border-indigo-400s rounded-full outline-none"
        placeholder="Email"
        type="email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py3 border border-solid border-indigo-400s rounded-full outline-none"
        placeholder="Password"
        type="password"
      />
      <div className="max-w-[400px] w-full mx-auto">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Sumitting..." : "Submit"}
          full
        />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
          }}
          className="text-indigo-600"
        >
          {isRegister ? " Sign in" : " Sign Up"}
        </button>
      </p>
      <p className="text-center">
        {"To get default account details "}
        <button
          onClick={() => {
            defaultDetails();
          }}
          className="text-indigo-600"
        >
          {" Click here"}
        </button>
      </p>
    </div>
  );
}
