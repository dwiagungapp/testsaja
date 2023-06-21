import React from "react";
import { FaApple } from "react-icons/fa";

let categoryData = [
  {
    categoryName: "Technology",
    icon: <FaApple />,
  },
  {
    categoryName: "Technology",
    icon: <FaApple />,
  },
  {
    categoryName: "Technology",
    icon: <FaApple />,
  },
  {
    categoryName: "Technology",
    icon: <FaApple />,
  },
  {
    categoryName: "Technology",
    icon: <FaApple />,
  },
  {
    categoryName: "Technology",
    icon: <FaApple />,
  },
  {
    categoryName: "Technology",
    icon: <FaApple />,
  },
  {
    categoryName: "Technology",
    icon: <FaApple />,
  },
  {
    categoryName: "Technology",
    icon: <FaApple />,
  },
  {
    categoryName: "Technology",
    icon: <FaApple />,
  },
];

const CategorySection = () => {
  return (
    <div className="w-full bg-[#F6F7FA] px-6 py-6 border-2">
      <div className="w-full flex items-center justify-center">
        <p className="mb-10 text-3xl font-semibold ">Popular Categories</p>
      </div>
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-5 place-items-center gap-5">
        {categoryData?.map((item, index) => (
          <div
            key={index}
            className="p-10 bg-white flex items-center justify-center shadow-sm transform hover:scale-110 transition duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="h-[73px] w-[73px] bg-cyan-300 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <p>{item.categoryName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;