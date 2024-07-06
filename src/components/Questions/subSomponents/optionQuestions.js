import React, { useState } from "react";

export default function OptionQuestions({
  icon,
  question,
  options,
  description,
  handleOptionChange,
  selectedOptions = [],
}) {
  console.log(selectedOptions);
  return (
    <div className="flex flex-col  lg:items-center gap-y-8 -mt-4 px-8 lg:px-0">
      <div className="hidden lg:flex items-center justify-center mt-4 lg:mt-0 lg:mr-4">
        <img src={icon} className=" lg:h-16 lg:w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24" alt="" />
      </div>
      <div className="flex flex-col lg:items-center w-full lg:justify-center lg:-mt-6 gap-y-4">
        <div className=" flex lg:items-center lg:justify-center">
          <p className="text-volt-green text-2xl  md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-[64px] font-semibold text-center">
            {question}
          </p>
        </div>
        <div className="text-white text-xl  lg:text-[30px] font-medium   text-left  lg:text-center ">{description}</div>
      </div>


      {options.map((option, index) => (

        <button
          key={index}
          className={`flex items-center justify-center text-center ${selectedOptions.includes(option) ? 'border-white bg-volt-green text-black' : 'bg-white text-[#B2B2B4]'}   gap-y-2 lg:gap-y-2 xl:gap-y-2 2xl:gap-y-4 cursor-pointer text-xl lg:text-xl 2xl:text-[30px] border w-full lg:w-5/12 border-volt-green hover:border-white hover:text-black-button hover:bg-volt-green  rounded-lg  h-16 md:h-10 lg:h-12 xl:h-16 2xl:h-20`}
          value={option}
          onClick={handleOptionChange}
        >
          {option}
        </button>

      ))}
    </div>
  );
}
