import React, { useContext, useState } from "react";


export default function EVAnalysis({handleEmailChange, handleNameChange , name, email}) {


  return (
    <div className="flex flex-col  md:items-center md:justify-center gap-y-5 px-10 lg:px-0">
      <div className="hidden lg:flex items-center justify-center lg:mt-0 lg:mr-4">
      <img src="/images/message.svg" alt="ev analysis" className="2xl:w-[70%] xl:w-[60%]  lg:w-[40%]"
      />
      </div>

      <div className="flex md:items-center md:justify-center -mt-2  ">
        <p className="text-volt-green  text-2xl lg:text-5xl  2xl:text-6xl font-semibold lg:text-center">
          Receive your EV analysis in a minute!
        </p>
      </div>

      <div className="text-xl lg:text-[30px] text-white font-medium ">Type in your name and email below</div>

      <div className="flex flex-col items-center w-full gap-y-4 lg:gap-y-6">
        <div className="flex items-center lg:w-6/12 justify-center border  border-volt-green hover:border-white rounded-lg h-16 md:h-10 lg:h-12 xl:h-14 2xl:h-16">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            className="w-full outline-none text-black-button text-center px-4 h-full rounded-lg text-[30px] font-normal leading-[150%] placeholder:font-normal placeholder:text-[30px] placeholder:xl:text-2xl  "
          />
        </div>
        <div className="flex items-center  lg:w-6/12 justify-center border  border-volt-green hover:border-white rounded-lg h-16 md:h-10 lg:h-12 xl:h-14 2xl:h-16 " >
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full outline-none text-black-button text-center px-4 h-full rounded-lg text-[30px] font-normal leading-[150%] placeholder:font-normal placeholder:text-[30px] placeholder:xl:text-2xl "
          />
        </div>
      </div>
   
    </div>
  );
}
