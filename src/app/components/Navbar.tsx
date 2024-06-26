import React from 'react';

interface NavbarProps {
  username: string;
}

export default function Navbar({ username }: NavbarProps) {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">KMUTNB Planner</div>
      <div className="text-white">{username}</div>
    </nav>
  );
};