import { forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, TableCellsIcon, BriefcaseIcon, UserIcon } from "@heroicons/react/24/solid";

const SideBar = forwardRef(({ showNav }, ref) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    if (path === location.pathname) {
      window.location.reload(); // Reload the document if the same path is clicked
    } else {
      navigate(path);
    }
  };

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm border-r-2 border-gray-100">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img className="w-12 h-12" src="/logosidebar.png" alt="logo" />
        </picture>
      </div>

      <div className="flex flex-col">
        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            location.pathname === "/"
              ? "bg-orange-100 text-orange-500"
              : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
          }`}
          onClick={() => handleNavigate("/")}
        >
          <div className="mr-2">
            <HomeIcon className="h-5 w-5" />
          </div>
          <div>
            <p>Home</p>
          </div>
        </div>
        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            location.pathname === "/dashboard/list-job-vacancy"
              ? "bg-orange-100 text-orange-500"
              : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
          }`}
          onClick={() => handleNavigate("/dashboard/list-job-vacancy")}
        >
          <div className="mr-2">
            <TableCellsIcon className="h-5 w-5" />
          </div>
          <div>
            <p>Dashboard</p>
          </div>
        </div>
        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            location.pathname === "/dashboard/list-job-vacancy/form"
              ? "bg-orange-100 text-orange-500"
              : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
          }`}
          onClick={() => handleNavigate("/dashboard/list-job-vacancy/form")}
        >
          <div className="mr-2">
            <BriefcaseIcon className="h-5 w-5" />
          </div>
          <div>
            <p>Create New Job</p>
          </div>
        </div>
        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            location.pathname === "/dashboard/profile"
              ? "bg-orange-100 text-orange-500"
              : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
          }`}
          onClick={() => handleNavigate("/dashboard/profile")}
        >
          <div className="mr-2 flex flex-wrap">
            <UserIcon className="h-5 w-5" />
          </div>
          <div>
            <p>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;