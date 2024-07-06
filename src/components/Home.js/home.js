import React from "react";

export default function Electricity() {
  const handleClick = () => {
    window.location.href = "/questions";
  };

  return (
    <div className="w-full flex flex-col justify-center bg-black">
      <div className="  flex flex-col items-center justify-center   ">
        <img className="block lg:hidden  h-56 w-56 " src="/images/electricity.svg" />
        <p className=" pb-8 lg:py-0 text-white lg:text-volt-green mt-4 lg:mt-0 sm:text-[21px] md:text-5xl lg:text-5xl 2xl:text-[64px] font-medium lg:font-semibold text-center xl:leading-[72px]">
          Electric Vehicle <br /> Questionnaire: Finding the <br /> Perfect EV
          for Cargo
        </p>
      </div>
    </div>
  );
}
