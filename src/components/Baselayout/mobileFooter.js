import Link from "next/link";
import React from "react";

export default function MobileFooter({ hidden, text, handleClick }) {
  return (
    <>
    
      {!hidden && (
        <div className="w-full flex items-center justify-center bg-contain bg-no-repeat bg-[url('/images/lines.svg')]  bg-volt-green  py-7 px-10">
         
            <button
              onClick={handleClick}
              className="bg-black-button w-full text-white rounded-lg text-center text-xl leading-[150%] font-normal py-5 px-[134px] "
            >
              {text}
            </button>
       
        </div>
      )}
    </>
  );
}
