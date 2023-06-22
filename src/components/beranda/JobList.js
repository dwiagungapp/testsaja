import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEnvironment } from 'react-icons/ai';
import { GlobalContext } from '../../context/GlobalContext';

const JobList = () => {
  const { handleFunctions } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { formatRupiah } = handleFunctions;
  const [searchQuery, setSearchQuery] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  useEffect(() => {
    axios
      .get('https://dev-example.sanbercloud.com/api/job-vacancy')
      .then((res) => {
        const reversedData = res.data.data.reverse();
        setData(reversedData);
        setFilteredData(reversedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filteredJobs = data.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (minSalary === '' || parseInt(job.salary_min) >= parseInt(minSalary))
    );
    setFilteredData(filteredJobs);
  }, [searchQuery, minSalary, data]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMinSalaryChange = (e) => {
    setMinSalary(e.target.value);
  };

  const handleReset = () => {
    setSearchQuery('');
    setMinSalary('');
    setCurrentPage(1);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredData.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <div className='border-2 rounded-lg mx-6 my-10 p-10'>
      <div className="flex items-center justify-center">
        <p className="text-3xl font-semibold">Search Jobs</p>
      </div>
      <div className=" mx-2 flex flex-col items-center justify-center mt-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full sm:w-[50%] px-4 py-2 outline-none border border-2 border-gray-300 rounded-lg mb-4"
          placeholder="Search by job title or company city..."
        />
        <input
          type="number"
          value={minSalary}
          onChange={handleMinSalaryChange}
          className="mx-2 w-full sm:w-[50%] px-4 py-2 outline-none border-2 border-gray-300 rounded-lg ml-0.5 mb-4"
          placeholder="Min Salary"
        />
        <div className="flex flex-row justify-center sm:justify-start">
          <button className="mb-4 sm:ml-2 bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:opacity-80">
            Search
          </button>
          <button
            className="mb-4 ml-2 sm:ml-2 bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:opacity-80"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      </div>
      <div className='mx-6 flex items-center justify-center'>
      <p className="text-3xl font-semibold">Latest Job</p>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 text-gray-600 body-font my-10 mx-4">
        {currentJobs.map((res) => (
          <Link
            to={`/job-vacancy/${res.id}`}
            key={res.id}
            className="border-2 rounded-lg m-2"
          >
            <div className="h-48 relative">
              <img
                alt="companylogo"
                className="object-cover object-center w-full h-full"
                src={res.company_image_url}
              />
            </div>
            <div className="p-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                {res.company_name}
              </h3>
              <div className="flex items-center">
                <AiOutlineEnvironment />
                <p className="text-gray-500 text-xs tracking-widest ml-2">
                  {res.company_city}
                </p>
              </div>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                {res.title}
              </h2>
              <p className="mt-1">
                {formatRupiah(res.salary_min + '')}
                <span className="text-sm font-light">/Month</span>
              </p>
            </div>
          </Link>
        ))}
      </section>
      <div className="flex justify-center my-4">
        {filteredData.length > jobsPerPage && (
          <nav className="inline-flex">
            <ul className="flex items-center">
              {Array.from({ length: Math.ceil(filteredData.length / jobsPerPage) }).map((_, index) => (
                <li key={index}>
                  <button
                    className={`px-3 py-2 mx-1 rounded ${
                      currentPage === index + 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default JobList;