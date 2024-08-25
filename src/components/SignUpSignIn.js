"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function SignUpSignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const createUserDocument = async (user) => {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName || name,
          email,
          photoURL: photoURL || "",
          createdAt,
        });
        toast.success("Account Created!");
      } catch (error) {
        toast.error("Error creating user document: " + error.message);
        console.error("Error creating user document: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      await createUserDocument(user);
      toast.success("Successfully Signed Up!");
      router.push("/home");
    } catch (error) {
      toast.error("Error signing up with email and password: " + error.message);
      console.error(
        "Error signing up with email and password: ",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged In Successfully!");
      router.push("/home");
    } catch (error) {
      toast.error("Error signing in with email and password: " + error.message);
      console.error(
        "Error signing in with email and password: ",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await createUserDocument(user);
        toast.success("User Authenticated Successfully!");
        router.push("/home");
      } else {
        throw new Error("User authentication failed.");
      }
    } catch (error) {
      toast.error("Error signing in with Google: " + error.message);
      console.error("Error signing in with Google: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full mt-5">
      {flag ? (
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 m-4 shadow-md rounded-xl p-8 bg-white">
          <h2 className="text-center font-bold text-[#3A244A] text-2xl">
            Log In
          </h2>
          <form onSubmit={signInWithEmail}>
            <div className="my-4 w-full">
              <p>Email</p>
              <input
                type="email"
                placeholder="JohnDoe@gmail.com"
                className="border-b border-black p-2 w-full rounded-none placeholder-black/50 focus:outline-none focus:opacity-100 transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-4 w-full">
              <p>Password</p>
              <input
                type="password"
                placeholder="Example123"
                className="border-b border-black p-2 w-full rounded-none placeholder-black/50 focus:outline-none focus:opacity-100 transition duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="text-[#3A244A] text-center w-full my-2 py-2 px-4 bg-white border border-[#3A244A] rounded-sm cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-[#3A244A] hover:text-white"
            >
              {loading ? "Loading..." : "Log In with Email and Password"}
            </button>
          </form>
          <p className="text-center my-2">or</p>
          <button
            disabled={loading}
            className="text-white text-center w-full my-2 py-2 px-4 bg-[#3A244A] border border-[#3A244A] rounded-sm cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#3A244A]"
            onClick={signInWithGoogle}
          >
            {loading ? "Loading..." : "Log In with Google"}
          </button>
          <p
            onClick={() => setFlag(!flag)}
            className="text-center mt-2 mb-0 cursor-pointer"
          >
            Or Don't Have An Account?{" "}
            <span className="text-[#D72638] font-bold">Click Here.</span>
          </p>
        </div>
      ) : (
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 m-4 shadow-md rounded-xl p-8 bg-white">
          <h2 className="text-center font-bold text-[#3A244A] text-2xl">
            Sign Up
          </h2>
          <form onSubmit={signUpWithEmail}>
            <div className="my-4 w-full">
              <p>Full Name</p>
              <input
                type="text"
                placeholder="John Doe"
                className="border-b border-black p-2 w-full rounded-none placeholder-black/50 focus:outline-none focus:opacity-100 transition duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my-4 w-full">
              <p>Email</p>
              <input
                type="email"
                placeholder="JohnDoe@gmail.com"
                className="border-b border-black p-2 w-full rounded-none placeholder-black/50 focus:outline-none focus:opacity-100 transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-4 w-full">
              <p>Password</p>
              <input
                type="password"
                placeholder="Example123"
                className="border-b border-black p-2 w-full rounded-none placeholder-black/50 focus:outline-none focus:opacity-100 transition duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-4 w-full">
              <p>Confirm Password</p>
              <input
                type="password"
                placeholder="Example123"
                className="border-b border-black p-2 w-full rounded-none placeholder-black/50 focus:outline-none focus:opacity-100 transition duration-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="text-[#3A244A] text-center w-full my-2 py-2 px-4 bg-white border border-[#3A244A] rounded-sm cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-[#3A244A] hover:text-white"
            >
              {loading ? "Loading..." : "Sign Up Now"}
            </button>
          </form>
          <p className="text-center my-2">or</p>
          <button
            disabled={loading}
            className="text-white text-center w-full my-2 py-2 px-4 bg-[#3A244A] border border-[#3A244A] rounded-sm cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#3A244A]"
            onClick={signInWithGoogle}
          >
            {loading ? "Loading..." : "Sign Up with Google"}
          </button>
          <p
            onClick={() => setFlag(!flag)}
            className="text-center mt-2 mb-0 cursor-pointer"
          >
            Or Have An Account Already?{" "}
            <span className="text-[#D72638] font-bold">Click Here.</span>
          </p>
        </div>
      )}
    </div>
  );
}
