import React from "react";

export function NavBar() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="flex text-teal-600 items-center" href="#">
          <img className="h-16" src="/logo.png" />
          <div>
            <span className="text-black text-2xl font-bold">Trash</span>
            <span className="text-[rgba(50,195,108,1)] text-2xl font-bold">Linker</span>
          </div>
        </a>
      </div>
    </header>
  );
}
