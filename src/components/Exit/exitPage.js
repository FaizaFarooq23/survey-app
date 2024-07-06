import React from "react";


export default function ExitPage() {
  return (
    <>
      <div className="flex flex-col items-center  px-10 lg:px-0">
        <div className="hidden lg:flex items-center justify-center lg:mt-0 lg:mr-4">
          <img
            src="/images/allSet.gif"
            alt="Your GIF"
            className="xl:w-48 xl:h-48 2xl:h-56 2xl:w-56"
          />
        </div>
        <div className="w-full flex flex-col md:items-center md:justify-center -mt-4 xl:gap-y-4 2xl:gap-y-6">
          <div className="w-full lg:w-1/2 flex md:items-center md:justify-center">
            <p className="text-volt-green  text-2xl md:text-5xl xl:text-[64px] font-semibold lg:text-center">
              You’re all Set!
            </p>
          </div>

          <div className="text-white text-xl lg:text-[30px] font-normal lg:font-medium">
            Please review your inbox to access the analysis of your EV{" "}
          </div>
        </div>
        
      </div>
  
    </>
  );
}
