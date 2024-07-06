import Questions from "@/components/Questions/questions";
import React, { useEffect, useState, useContext } from "react";
import { QuestionContext } from "@/context/GlobalProvider";
import { useRouter } from "next/router";
import MobileFooter from "@/components/Baselayout/mobileFooter";
import Baselayout from "@/components/Baselayout/baselayout";

export default function index() {
  const router = useRouter();
  const { questions, setAnswer } = useContext(QuestionContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValid, setInputValid] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleAnswerChange = (event) => {
    const value = event.target.value;
    // check id of current question
    if (questions[currentQuestionIndex].id !== 17) {
      setInputValid(/^\d+(\.\d+)?$/.test(value));
    }
    else {
      setInputValid(true);
    }

    setAnswer({
      ...questions[currentQuestionIndex],
      answer: value,
    });
  };

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "Logistics") {
      setAnswer({
        id: 2,
        icon: "images/truck.svg",
        question: "Current Fleet Information",
        description: "Use case for Logistics-",
        type: "options",
        options: ["Parking area < > Quay", "Rail < > Quay"],
        answer: "",
      });
      setAnswer({
        ...questions[currentQuestionIndex],
        answer: selectedOption,
      });
      setCurrentQuestionIndex(currentQuestionIndex + 1);

    } else if (selectedOption === "Port") {
      setAnswer({
        id: 2,
        icon: "images/truck.svg",
        question: "Current Fleet Information",
        description: "Use case for Port-",
        type: "options",
        options: ["Quay < > stacking area", " Rail < > Quay < > stacking area"],
        answer: "",
      }); 
      setAnswer({
        ...questions[currentQuestionIndex],
        answer: selectedOption,
      });
      setCurrentQuestionIndex(currentQuestionIndex + 1);

    } else {
      if(selectedOptions.includes(selectedOption)) {
        selectedOptions.splice(selectedOptions.indexOf(selectedOption), 1);
      }
      else {
        selectedOptions.push(selectedOption);
      }

      setAnswer({
        ...questions[currentQuestionIndex],
        answer: selectedOptions.join(", "),
      });


    }
    //else set answer equal to selected option

      
    

  };

  const submitToApi = () => {
    router.push("/ev_analysis");
  };

  const nextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.answer === "") {
      alert("Please answer the current question before proceeding.");
    } else if (!inputValid) {
      alert("Please enter a valid number.");
    } else {
      if (currentQuestionIndex === 1 && questions[1].answer === "Logistics") {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (
        currentQuestionIndex === 1 &&
        questions[1].answer !== "Logistics"
      ) {
        setCurrentQuestionIndex(currentQuestionIndex + 2);
      } else if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const prevQuestion = () => {
    console.log(questions[1].answer);
    console.log(currentQuestionIndex);
    if (currentQuestionIndex > 0) {
      if (questions[1].answer === "Logistics" && currentQuestionIndex === 16) {
        setCurrentQuestionIndex(currentQuestionIndex - 2);
      }
      else if (questions[1].answer === "Port" && currentQuestionIndex === 17) {
        setCurrentQuestionIndex(currentQuestionIndex - 2);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    } else if (currentQuestionIndex === 0) {
      router.push("/");
    }

    
  };

  const handleClick = () => {
    router.push("/ev_analysis");
  };

  useEffect(() => {
    if (questions[1].answer === "Logistics" && currentQuestionIndex === 15) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    if (questions[1].answer === "Port" && currentQuestionIndex === 16) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex]);

  const inputStyle = inputValid ? {} : { borderColor: ["#ED4337"] };

  // spinner
  if (questions[1].answer === "Port" && currentQuestionIndex === 16) {
  return (
    <div className="border-t-4 border-[#70F149] border-solid rounded-full h-12 w-12 animate-spin"></div>
  )
  }

   // spinner
   if (questions[1].answer === "Logistics" && currentQuestionIndex === 15) {
    return (
      <div className="border-t-4 border-[#70F149] border-solid rounded-full h-12 w-12 animate-spin"></div>
    )
  }

  if (currentQuestionIndex === questions.length - 1) {
    return (
      <Baselayout
        text={"Next"}
        mainText={"Next"}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        grayClick={prevQuestion}
        blackClick={nextQuestion}
        submitToApi={submitToApi}
        handleClick={handleClick}
      >
        <Questions
          data={questions}
          currentQuestionIndex={currentQuestionIndex}
          handleAnswerChange={handleAnswerChange}
          handleOptionChange={handleOptionChange}
          inputStyle={inputStyle}
          selectedOptions={selectedOptions}
        />
      </Baselayout>
    );
  }

  return (
    <Baselayout
      text={"Next"}
      mainText={"Next"}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      grayClick={prevQuestion}
      blackClick={nextQuestion}
      submitToApi={submitToApi}
      handleClick={nextQuestion}
    >
      <Questions
        data={questions}
        currentQuestionIndex={currentQuestionIndex}
        handleAnswerChange={handleAnswerChange}
        handleOptionChange={handleOptionChange}
        inputStyle={inputStyle}
        selectedOptions={selectedOptions}
      />
    </Baselayout>
  );
}
