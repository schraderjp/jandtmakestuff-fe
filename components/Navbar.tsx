'use client';

import React from 'react';
import Cart from './Cart';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="px-1 py-2 flex items-center justify-between">
      <h1 className="pl-4 text-2xl font-bold">J and T Make Stuff</h1>
      <Cart />
      <UserButton />
      <SignUpButton />
      <SignInButton />
    </nav>
  );
};

export default Navbar;
