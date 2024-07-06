import React from "react";


export default function Header({customWidth, width ,prePage , hideDiv}) {
  return (
    <div className="flex flex-col  items-center justify-center lg:items-start lg:justify-start gap-y-6 lg:gap-y-0  py-8 lg:py-0 px-10 lg:px-0 ">
   {!hideDiv && <div className="w-full flex items-start justify-start lg:hidden ">
      <img src="images/backArrow.svg" className="h-6 w-6"  onClick={prePage}/>
    </div>}
      <div className="flex flex-col">
      <img src="images/pure-volt-logo.svg" className=" w-72 h-12" />
      <p className="text-[13px]  text-white ">
        Unlock the Full Potential of Your Electric Vehicle!
      </p>
      </div>
      <div className="flex  lg:hidden w-full bg-gray-200  h-2 dark:bg-gray-700">
      {customWidth ? 
          <div className="bg-volt-green h-2 " style={{ width: `${customWidth}` }}></div>
        :
        <div className="bg-volt-green h-2 " style={{ width: `${width}` }}></div>
}
      </div>
      
    </div>
  );
}
