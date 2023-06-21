import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiOutlineEnvironment } from 'react-icons/ai'
import { GlobalContext } from '../../context/GlobalContext';

const JobListHome = () => {

  const { state, handleFunctions } = useContext(GlobalContext);

    const [data, setData] = useState(null)

    const {
      convertSize,
      formatRupiah,
      renderStars,
      handleText,
    } = handleFunctions;
      
        useEffect(() => {
          axios.get("https://dev-example.sanbercloud.com/api/job-vacancy")
            .then((res) => {
                setData([...res.data.data])
            })
            .catch((error) => {
            })
        }, [])

    return (
        <>
        <div className="w-full flex items-center justify-center">
        <p className="mt-10 text-3xl font-semibold">All Popular Listed jobs</p>
      </div>
        <section className="flex text-gray-600 body-font">
        <div className="flex mx-auto my-10 ">
        <div className="flex flex-wrap items-center justify-center ">

        { data !== null && data
                    .filter((res, index) => {
                        return index < 3
                    })
                    .map((res) => {
  
    return (
        <>
        <Link to={`/job-vacancy/${res.id}`} key={res?.id} className="lg:w-1/4 md:w-1/2 p-4 w-full border-2 rounded-lg m-2 flex-grow">
        <a className="block relative h-48 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={res.company_image_url}
          />
        </a>
        <div className=" mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {res.company_name}
          </h3>
          </div>
          <div className="flex">
          <AiOutlineEnvironment/> <p className='text-gray-500 text-xs tracking-widest ml-2'>{res.company_city}</p>
          </div>
          <h2 className="text-gray-900 title-font text-lg font-medium">
          {res.title}
          </h2>
          <p className="mt-1">
        {formatRupiah(res?.salary_min + "") }
        <span className="text-sm font-light">
          /Month
        </span>
          </p>
        </Link>
    </>
    )
})}
  </div>
  </div>
</section>
<div className='flex items-center justify-center'>
<button className="bg-green-600 text-white px-4 py-4 rounded-lg transition duration-300 hover:opacity-95">
<Link to="/job-vacancy">Lihat lebih banyak lowongan</Link>
        </button>
        </div>
        </>
    )
}

export default JobListHome