import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEnvironment } from 'react-icons/ai';
import { GlobalContext } from '../../context/GlobalContext';

const JobListHome = () => {
  const { handleFunctions } = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const { formatRupiah, handleText} = handleFunctions;

  useEffect(() => {
    axios
      .get('https://dev-example.sanbercloud.com/api/job-vacancy')
      .then((res) => {
        const reversedData = res.data.data.reverse();
        setData(reversedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="mx-6 flex items-center justify-center">
        <p className="font-sans mt-10 text-3xl font-semibold">Find your jobs</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 text-gray-600 body-font my-10 mx-4">
        {data !== null &&
          data
            .filter((res, index) => index < 6)
            .map((res) => (
              <Link
                to={`/job-vacancy/${res.id}`}
                key={res.id}
                className="border shadow-md rounded-lg m-2"
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
                  <h2 className="font-sans text-green-600 title-font text-lg font-bold mt-2">
                    {res.title}
                  </h2>
                  <p className="mt-1">
                  {formatRupiah(res.salary_min + '')} - {formatRupiah(res.salary_max + '')}/Month
                  </p>
                  <h2 className="font-sans text-gray-500 title-font text-sm font-medium mt-6">
                  {handleText(res.job_description, 100) }
                  </h2>
                </div>
              </Link>
            ))}
      </div>
      <div className="flex items-center justify-center mb-10">
        <button className="bg-[#21A753] text-white px-4 py-4 rounded-lg transition duration-300 hover:opacity-80">
          <Link to="/job-vacancy">Lihat lebih banyak lowongan</Link>
        </button>
      </div>
    </>
  );
};

export default JobListHome;