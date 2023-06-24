import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { AiOutlineEnvironment } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const JobDetail = () => {
  const { handleFunctions } = useContext(GlobalContext);

  const { Id } = useParams();
  const [data, setData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = Cookies.get('token');

  const { formatRupiah, handleStatus } = handleFunctions;

  useEffect(() => {
    if (Id !== undefined) {
      axios
        .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${Id}`)
        .then((res) => {
          setData(res.data);
        });
    }
  }, []);

  const handleApplyNow = () => {
    // Perform any necessary submission logic here

    // Show SweetAlert on successful submission
    Swal.fire({
      icon: 'success',
      title: 'Lamaran Sukses Terkirim',
      text: 'Terima kasih telah mengirim lamaran!',
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center my-10">
        <p className="text-green-500 font-semibold mb-4">Lamaran sukses terkirim!</p>
        <button
          type="button"
          className="bg-[#21A753] hover:opacity-80 text-white font-medium p-3 rounded-lg"
          onClick={() => setIsSubmitted(false)}
        >
          Kembali ke lamaran
        </button>
      </div>
    );
  }

  if (data === null) {
    return (
      <div className="justify-center flex flex-wrap mx-10 mb-10 py-8 gap-7">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center my-10 px-4 sm:px-8 md:px-16">
        <div className="bg-white border max-w-4xl w-full">
          <div className="">
            <img src={data?.company_image_url} alt="Company" className="w-full h-80 border-b" />
          </div>
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <img alt="Company Foto" src={data?.company_image_url} className="rounded-lg h-10 w-10 mr-10" />
                <div>
                  <h3 className="text-lg leading-6 font-bold text-gray-900">{data?.title}</h3>
                  <h3 className="text-sm leading-6 font-small text-[#21a753]">{data?.company_name}</h3>
                  <div className="flex my-2">
                    <AiOutlineEnvironment />
                    <p className="ml-2 max-w-2xl text-sm text-gray-500">{data?.company_city}</p>
                  </div>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{data?.created_at}</p>
                </div>
              </div>
              {token && (
                <button
                  type="button"
                  className="bg-[#21A753] hover:opacity-80 text-white font-medium p-3 rounded-lg"
                  onClick={handleApplyNow}
                >
                  Lamar sekarang
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center my-10 px-4 sm:px-8 md:px-16">
        <div className="bg-white max-w-4xl w-full border">
          <div className="px-6 py-4">
            <div className="py-4 flex flex-col">
            <div className="mb-4">
            <h4 className="text-lg leading-6 font-bold text-gray-900 mb-2">Job Description</h4>
            <ul className="list-disc list-inside text-sm text-gray-500">
              {data?.job_description.split('\n').map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>

              <div className="mb-4">
                <h4 className="text-lg leading-6 font-bold text-gray-900 mb-2">Job Qualification</h4>
                <p className="text-sm text-gray-500">{data?.job_qualification}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap max-w-4xl border w-full p-2">
          <div className="m-4">
            <h4 className="text-lg leading-6 font-bold text-gray-900 mb-2">Job Type</h4>
            <p className="text-sm text-gray-500">{data?.job_type}</p>
          </div>

          <div className="m-4">
            <h4 className="text-lg leading-6 font-bold text-gray-900 mb-2">Job Tenure</h4>
            <p className="text-sm text-gray-500">{data?.job_tenure}</p>
          </div>

          <div className="m-4">
            <h4 className="text-lg leading-6 font-bold text-gray-900 mb-2">Job Status</h4>
            <p className="text-sm text-gray-500">{handleStatus(data?.job_status)}</p>
          </div>

          <div className="m-4">
          <h4 className="text-lg leading-6 font-bold text-gray-900 mb-2">Job Salary</h4>
          <p className="text-sm text-gray-500">
            {formatRupiah(data?.salary_min + '')} - {formatRupiah(data?.salary_max + '')}/Month
          </p>
        </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;