'use client';

import { Loader2Icon, LoaderIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';

const Cart = dynamic(() => import('../components/Cart'), {
  ssr: false,
  loading: () => <Loader />,
});

const Loader = () => <Loader2Icon className="ml-auto animate-spin" size={24} />;

const Navbar = () => {
  return (
    <nav className="px-1 py-2 flex">
      <Cart />
    </nav>
  );
};

export default Navbar;
