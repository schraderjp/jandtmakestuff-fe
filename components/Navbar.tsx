"use client";

import React, { useEffect } from "react";
import Cart from "./Cart";
import { useUser } from "@clerk/nextjs";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isLoaded, user } = useUser();

  return (
    <nav className="px-1 py-2 flex items-center justify-between">
      <h1 className="pl-4 text-2xl font-bold">J and T Make Stuff</h1>
      {isLoaded && user && <p>Logged in</p>}
      <Cart />
      <UserButton />
      <SignUpButton />
      <SignInButton />
    </nav>
  );
};

export default Navbar;
