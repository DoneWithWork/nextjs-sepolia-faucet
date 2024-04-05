import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto p-5 flex flex-row items-center justify-between gap-10">
      <h1 className="text-4xl font-bold">
        DoneWithWork{" "}
        <span className="text-orange-600 font-extrabold">Faucet</span>
      </h1>
      <Link
        href={"https://github.com/DoneWithWork"}
        target="_blank"
        referrerPolicy="no-referrer"
      >
        <FaGithub size={35} />
      </Link>
    </nav>
  );
}

export default Navbar;
