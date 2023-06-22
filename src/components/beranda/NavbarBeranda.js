import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi"
import { Link, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";

const NavbarBeranda = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="border-b border-gray-300 bg-white py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between xl:max-w-7xl mx-auto max-w-full px-[8%] flex-wrap w-full">
          <img
            src="/joblogo.png"
            alt="Logo"
            className="h-12"
          />

          <FiMenu className="lg:hidden block h-6 w-6 cursor-pointer" onClick={() => setOpen(!open)} />

          <nav className={`${open ? "block" : "hidden"} w-full lg:flex items-center lg:w-auto`}>
            <ul className="text-base text-gray-600 lg:flex lg:justify-between">
              <li>
                <Link
                  to="/"
                  className={`lg:px-5 py-2 block hover:text-[#21A753] font-semibold ${location.pathname === '/' ? 'text-[#21A753]' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/job-vacancy"
                  className={`lg:px-5 py-2 block hover:text-[#21A753] font-semibold ${location.pathname === '/job-vacancy' ? 'text-[#21A753]' : ''}`}
                >
                  Lowongan
                </Link>
              </li>
              <li>
                {!Cookies.get("token") && (
                  <Link
                    to="/register"
                    className="lg:px-5 py-2 block hover:text-[#21A753] font-semibold"
                  >
                    Register
                  </Link>
                )}
              </li>
              <li>
                {!Cookies.get("token") && (
                  <Link
                    to="/login"
                    className="px-6 py-2 block bg-[#21A753] text-white rounded-lg"
                  >
                    Login
                  </Link>
                )}
              </li>
              <li>
                {Cookies.get("token") && (
                  <Link
                    to="/dashboard/list-job-vacancy"
                    className={`lg:px-5 py-2 block hover:text-[#21A753] font-semibold ${location.pathname.startsWith('/dashboard/list-job-vacancy') ? 'text-[#21A753]' : ''}`}
                  >
                    Dashboard
                  </Link>
                )}
              </li>
              <li>
                {Cookies.get("token") && (
                  <a
                    className="px-6 py-2 block bg-[#21A753] text-white rounded-lg hover:opacity-80"
                    href="/"
                    onClick={() => {
                      Cookies.remove("token");
                      Cookies.remove("name");
                      Cookies.remove("email");
                      Cookies.remove("image_url");
                    }}
                  >
                    Logout
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavbarBeranda;