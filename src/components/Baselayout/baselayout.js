import React, { useState } from "react";

import Header from "./header";
import Footer from "./footer";
import MobileFooter from "./mobileFooter";

export default function Baselayout({
  children,
  hideFooter,
  text,
  handleClick,
  currentQuestionIndex,
  totalQuestions,
  grayClick,
  blackClick,
  submitToApi,
  hideGrayButton,
  mainText,
  customWidth,
  hideDiv
}) {
  const totalPages = totalQuestions+3; 
  const validCurrentPage = Math.min(totalPages, Math.max(1, currentQuestionIndex));
  const percentage = (validCurrentPage / totalPages) * 100;
  const width = `${percentage}%`;
  return (
    <div className="w-screen h-screen  justify-between overflow-y-hidden flex flex-col bg-black">
      <div className="flex items-start lg:pt-16 lg:px-20">
        <Header customWidth={customWidth} width={width} hideDiv={hideDiv} prePage={grayClick} />
      </div>
      <div>{children}</div>
      <div className="hidden lg:flex px-20 justify-end ">
        <Footer
          mainText={mainText}
          hideGrayButton={hideGrayButton}
          hideFooter={hideFooter}
          grayClick={grayClick}
          blackClick={blackClick}
          submitToApi={submitToApi}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />
      </div>

      <div className="lg:hidden">
        <MobileFooter text={text} handleClick={handleClick} />
      </div>

      <div className="hidden lg:flex w-full bg-gray-200  h-3 dark:bg-gray-700">
        {customWidth ? 
          <div className="bg-volt-green h-3 " style={{ width: `${customWidth}` }}></div>
        :
        <div className="bg-volt-green h-3 " style={{ width: `${width}` }}></div>
}
      </div>
    </div>
  );
}
