import React from "react";

export default function BlackButton({ text, blackClick, hideButton }) {
  return (
    <>
      {!hideButton && (
        <button
          onClick={blackClick}
          className="bg-volt-green text-[#060606] rounded-lg text-center md:text-xl 2xl:text-[30px] leading-[150%] font-medium md:py-3 lg:py-3 2xl:py-6 md:px-28 2xl:px-[125px]"
        >
          {text}
        </button>
      )}
      </>
   
  );
}
