import React, { useState } from 'react';
import {FiMenu} from "react-icons/fi"

import Cookies from "js-cookie";


const NavbarBeranda = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="border-b border-gray-300 py-4">
        <div className="flex items-center justify-between xl:max-w-7xl mx-auto max-w-full px-[8%] flex-wrap w-full">
        <img
            src="/joblogo.png"
            alt="Logo"
            className="h-12"
          />

          <FiMenu className="lg:hidden block h-6 w-6 cursor-pointer" onClick={() => setOpen(!open)} />

          <nav className={`${open ? "block" : "hidden"} 
          w-full lg:flex items-center lg:w-auto`}>
            <ul className="text-base text-gray-600 lg:flex lg:justify-between">
              <li>
                <a className="lg:px-5 py-2 block hover:text-blue-700 font-semibold" href="/">Home</a>
              </li>
              <li>
                <a className="lg:px-5 py-2 block hover:text-blue-700 font-semibold" href="/job-vacancy">Lowongan</a>
              </li>
              <li>
              {!Cookies.get("token") && <a className="lg:px-5 py-2 block hover:text-blue-700 font-semibold" href="/register">Register</a>}
              </li>
              <li>
              {!Cookies.get("token") && <a className="px-6 py-2 block bg-blue-700 text-white rounded-lg" href="/login">Login</a>}
              </li>
              <li>
              {Cookies.get("token") && ( <a className="lg:px-5 py-2 block hover:text-blue-700 font-semibold" href="/dashboard/list-job-vacancy">Dashboard</a>)}
              </li>
              <li>
              {Cookies.get("token") && ( <a className="px-6 py-2 block bg-blue-700 text-white rounded-lg hover:bg-blue-400" href="/"onClick={() => {
                Cookies.remove("token");
                Cookies.remove("name");
                Cookies.remove("email");
                Cookies.remove("image_url");
              }} >Logout</a>)}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavbarBeranda;
