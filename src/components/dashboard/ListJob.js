import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListJob = () => {
  const { handleFunctions } = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

  const { formatRupiah, handleEdit, handleDelete } = handleFunctions;

  useEffect(() => {
    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        setData([...res.data.data].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Calculate the index of the last job on the current page
  const lastIndex = currentPage * jobsPerPage;
  // Calculate the index of the first job on the current page
  const firstIndex = lastIndex - jobsPerPage;
  // Get the jobs to be displayed on the current page
  const currentJobs = data !== null ? data.slice(firstIndex, lastIndex) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="font-bold text-dark text-3xl mb-5 max-w-md lg:text-3xl">
            {" "}
            Data List Job
          </h1>
          <div className="flex justify-end">
            <Link to="/dashboard/list-job-vacancy/form">
              <button className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-400">
                Create Job
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full border">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                NO
              </th>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Title
              </th>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Company Name
              </th>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Salary
              </th>
              <th
                className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50"
                colSpan={2}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
                  {currentJobs.map((res, index) => {
                    return (
                      <React.Fragment key={res.id}>
                        <tr>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{index + 1}</div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  {res.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">
                  {res.company_name}
                </div>
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                <span>{formatRupiah(res?.salary_min + "") }</span>
              </td>
              <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
              <button
  onClick={handleEdit}
  value={res.id}
  type="button"
  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mr-2 mb-2"
>
  <FaEdit />
</button>

<button
  onClick={handleDelete}
  value={res.id}
  type="button"
  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
>
  <FaTrash />
</button>
              </td>
              </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        {data !== null && data.length > jobsPerPage && (
          <ul className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(data.length / jobsPerPage) }).map(
              (item, index) => (
                <li
                  key={index}
                  className={`px-2 py-1 cursor-pointer ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default ListJob;