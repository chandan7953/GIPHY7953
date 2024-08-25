"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-[#3A244A] py-3">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <h1 className="text-white text-lg font-bold">Chandan GIPHY</h1>

        {user && (
          <button
            className="text-dark lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <FiMenu className="w-6 h-6 text-white" />
          </button>
        )}

        {user && (
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:flex lg:items-center lg:w-auto w-full`}
          >
            <ul className="lg:flex lg:gap-4 lg:flex-row flex flex-col items-start lg:items-center gap-2">
              <li className="nav-item">
                <Link
                  href="/home"
                  className={`${
                    pathname === "/home"
                      ? "text-white font-semibold border-b-2 border-white"
                      : "text-white hover:text-gray-300 transition duration-300"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/favorites"
                  className={`${
                    pathname === "/favorites"
                      ? "text-white font-semibold border-b-2 border-white"
                      : "text-white hover:text-gray-300 transition duration-300"
                  }`}
                >
                  Favorites
                </Link>
              </li>
            </ul>
            <div className="navbar-text flex items-center gap-2 text-dark font-semibold mt-3 lg:mt-0 lg:ml-4">
              <img
                src={user?.photoURL || userSvg}
                alt="Profile Pic"
                width={user?.photoURL ? "32" : "24"}
                className="rounded-full"
              />
              <p
                onClick={logout}
                className="text-white cursor-pointer hover:text-gray-300 transition duration-300"
              >
                Logout
              </p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
