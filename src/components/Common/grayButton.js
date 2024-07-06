import React from "react";
export default function GrayButton({ text, handleClick, hideButton }) {
  return (
    <>
      {!hideButton && (
        <button
          onClick={handleClick}
          className=" bg-gray-button text-[#060606] rounded-lg text-center md:text-xl 2xl:text-[30px] leading-[150%] font-medium md:py-3 lg:py-3 2xl:py-6 md:px-28 2xl:px-[125px]"
        >
          {text}
        </button>
      )}
    </>
  );
}
