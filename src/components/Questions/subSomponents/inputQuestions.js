import React from "react";

export default function InputQuestions({
  icon,
  question,
  unit,
  description,
  answer,
  handleAnswerChange,
  inputStyle,
  hint,
}) {
  const inputref = React.useRef(null);

  React.useEffect(() => {
    inputref.current.focus();
  }, []);
  

  return (
    <div className="flex flex-col items-center gap-y-8 lg:gap-y-10 ">
      <div className="hidden lg:flex items-center justify-center lg:mt-0 lg:mr-4">
        <img src={icon} className="h-24 w-23" alt="" />
      </div>
      <div className="gap-y-10 flex flex-col w-full lg:items-center -mt-4  px-9 lg:px-0">
        <div className="flex lg:items-center lg:justify-center">
          <p className="text-volt-green text-2xl  md:text-5xl 2xl:text-[64px] font-semibold   lg:text-center">
            {question}
          </p>
        </div>

        <div className=" text-white -mt-4 text-left lg:text-center text-2xl lg:text-[30px] ">
          {description}
        </div>
      </div>
      <div
        className="flex items-center justify-end w-[80%] lg:w-[48%] border-2 border-volt-green hover:border-white bg-white rounded-lg px-4 py-7 h-20 md:h-10 lg:h-10 xl:h-12 2xl:h-20"
        style={inputStyle}
      >
        <input
          ref={inputref}
          type="text"
          value={answer}
          placeholder={hint}
          className=" outline-none text-[#060606] h-[50px] z-10 bg-transparent text-[30px] text-center placeholder:text-center w-full placeholder:font-normal placeholder:text-[30px]"
          onChange={handleAnswerChange}
        />
        <span className="text-[#B2B2B4] absolute text-[30px] font-normal leading-[150%] pr-8">
          {unit}
        </span>
      </div>
    </div>
  );
}
