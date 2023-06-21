import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalContext';
import { AiOutlineEnvironment } from 'react-icons/ai'

const JobDetail = () => {

    const { state, handleFunctions } = useContext(GlobalContext);

    const {Id} = useParams()
    const [data, setData] = useState(null)

    const {
        formatRupiah,
      } = handleFunctions;

    useEffect(() => {
        if(Id !== undefined) {
         axios.get(`https://dev-example.sanbercloud.com/api/job-vacancy/${Id}`)
            .then((res) => {
              setData(res.data)
            })
          }
  
      }, [])

      if (data === null){
        return <div className="justify-center flex flex-wrap mx-10 mb-10 py-8 gap-7"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-900"></div></div>
      }

       return (
        <>
<div className="flex flex-col items-center my-10 px-4 sm:px-8 md:px-16">
  <div className="bg-white shadow-md max-w-4xl w-full">
<div className="">
<img src='https://loremflickr.com/1000/250' alt='Company' className=' w-full '/>
</div>
<div className="px-6 py-4">
<div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img alt="Company Foto" src={data?.company_image_url} className="rounded-full h-10 w-10 mr-10" />
          <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
              {data?.title}
            </h3>
            <h3 className="text-sm leading-6 font-small text-gray-900">
              {data?.company_name}
            </h3>
            <div className="flex my-2">
            <AiOutlineEnvironment/> 
            <p className="ml-2 max-w-2xl text-sm text-gray-500">
            {data?.company_city}
            </p>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {data?.created_at}
            </p>
          </div>
        </div>
        <button type="button" className="bg-[#1d4ed8] hover:bg-blue-400 text-white font-bold p-3 rounded-lg">
          Lamar sekarang
        </button>
      </div>
      </div>
      </div>
      </div>

<div className="flex flex-col items-center my-10 px-4 sm:px-8 md:px-16">
  <div className="bg-white shadow-md max-w-4xl w-full">
    <div className="px-6 py-4">
      <div className="py-4 flex flex-col">

        <div className="mb-4">
          <h4 className="text-lg leading-6 font-medium text-gray-900 mb-2">
            Deskripsi pekerjaan
          </h4>
          <p className="text-sm text-gray-500">
            {data?.job_description}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-lg leading-6 font-medium text-gray-900 mb-2">
            Kualifikasi pekerjaan
          </h4>
          <p className="text-sm text-gray-500">
            {data?.job_qualification}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-lg leading-6 font-medium text-gray-900 mb-2">
            Status pekerjaan
          </h4>
          <p className="text-sm text-gray-500">
            {data?.job_tenure}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-lg leading-6 font-medium text-gray-900 mb-2">
            Gaji
          </h4>
          <p className="text-sm text-gray-500">
            {formatRupiah(data?.salary_min + "")}/Month
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    )
}

export default JobDetail