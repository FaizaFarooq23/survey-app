import React, { useContext, useState } from "react";
import InputQuestions from "./subSomponents/inputQuestions";
import OptionQuestions from "./subSomponents/optionQuestions";
import { QuestionContext } from "@/context/GlobalProvider";

export default function Questions({ data, currentQuestionIndex,handleAnswerChange ,handleOptionChange ,inputValue, inputStyle, selectedOptions}) {
  return (
    <div className="">
      {currentQuestionIndex < data.length && (
        <>
          {data[currentQuestionIndex].type === "textField" && (
            <InputQuestions
              key={data[currentQuestionIndex].id}
              icon={data[currentQuestionIndex].icon}
              question={data[currentQuestionIndex].question}
              unit={data[currentQuestionIndex].unit}
              description={data[currentQuestionIndex].description}
              answer={data[currentQuestionIndex].answer}
              handleAnswerChange={handleAnswerChange}
              inputStyle={inputStyle}
              hint={data[currentQuestionIndex].hint}
            />
          )}
          {data[currentQuestionIndex].type === "options" && (
            <OptionQuestions
              key={data[currentQuestionIndex].id}
              icon={data[currentQuestionIndex].icon}
              question={data[currentQuestionIndex].question}
              options={data[currentQuestionIndex].options}
              description={data[currentQuestionIndex].description}
              handleOptionChange={handleOptionChange}
              selectedOptions={selectedOptions}

            />
          )}
        </>
      )}
    </div>
  );
}
