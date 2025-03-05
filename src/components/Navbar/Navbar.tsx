"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white dark:bg-neutral-900 px-4 py-6">
      <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/icons/indeed.svg"
            alt="Indeed logo"
            height={30}
            width={100}
          />
        </div>

        {/* Menu button for mobile */}
        <div className="lg:hidden">
          <Button onClick={toggleMenu} variant="outline" size="icon">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Navigation links and buttons */}
        <div
          className={`w-full lg:flex lg:w-auto lg:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-4 lg:mt-0">
            <li>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="nav-link">
                Find Job
              </Link>
            </li>
            <li>
              <Link href="/company" className="nav-link">
                Companies
              </Link>
            </li>
            <li>
              <Link href="/employers" className="nav-link">
                Employer
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          </ul>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-4 lg:mt-0">
            <Link
              href="/sign-in"
              className="lg:px-4 lg:py-2 lg:rounded-md lg:text-blue-600 lg:hover:text-blue-700 lg:dark:hover:text-white lg:transition-all lg:duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/post-job"
              className="lg:px-4 lg:py-2 lg:rounded-md lg:bg-blue-600 lg:hover:bg-blue-700 lg:dark:bg-blue-700 lg:dark:hover:bg-blue-800 lg:transition-all lg:duration-300 lg:text-white"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
