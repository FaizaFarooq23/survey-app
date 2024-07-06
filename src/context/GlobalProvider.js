import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
const initialData = {
  data: [
    {
      id: 0,
      icon: "images/truck.svg",
      question: "Current Fleet Information",
      description:
        "Please specify the number of diesel tractors in your current fleet",
      type: "textField",
      hint: "Type here",
      answer: "",
    },
    {
      id: 1,
      icon: "images/truck.svg",
      question: "Current Fleet Information",
      description: "What is the primary use case for your tractors?",
      type: "options",
      options: ["Logistics", "Port"],
      answer: "",
    },

    {
      id: 2,
      icon: "images/truck.svg",
      question: "Current Fleet Information",
      description: "Use case for Logistics-",
      type: "options",
      options: ["Parking area < > Quay", "Rail < > Quay"],
      answer: "",
    },
    {
      id: 3,
      icon: "images/trip.svg",
      question: "Average Trip Information",
      description: "On average, how many kilometers (km) does a single trip",
      unit: "km",
      type: "textField",
      answer: "",
    },
    {
      id: 4,
      icon: "images/trip.svg",
      question: "Average Trip Information",
      description: "What is the average weight transported per trip in tons?",
      unit: "Ton",
      type: "textField",
      answer: "",
    },
    {
      id: 18,
      icon: "images/trip.svg",
      question: "Average Trip Information",
      description: "What is the average speed of your diesel tractors during trips (in km/h)?",
      unit: "Km/hr",
      type: "textField",
      answer: "",
    },
    {
      id: 5,
      icon: "images/trip.svg",
      question: "Average Trip Information",
      description:
        "On average, how many kilometers (km) do your diesel tractors cover in a single shift?",
      unit: "km",
      type: "textField",
      answer: "",
    },
    {
      id: 6,
      icon: "images/setting.svg",
      question: "Shift and Operations Information",
      description:
        "How many trips does a diesel tractor typically make during a shift?",
      type: "textField",
      answer: "",
    },
    {
      id: 7,
      icon: "images/setting.svg",
      question: "Shift and Operations Information",
      description: "What is the duration of your typical shift in hours?",
      unit: "Hr",
      type: "textField",
      answer: "",
    },
    {
      id: 8,
      icon: "images/setting.svg",
      question: "Shift and Operations Information",
      description: "How many shifts does your tractor operate in a day?",
      unit: "nb",
      type: "textField",
      answer: "",
    },
    {
      id: 9,
      icon: "images/setting.svg",
      question: "Shift and Operations Information",
      description:
        "What is the average distance covered by a single tractor per day (in km)?",
      unit: "km",
      type: "textField",
      answer: "",
    },
    {
      id: 10,
      icon: "images/timer.svg",
      question: "Driving waiting time",
      description:
        "What are the targeted hours of operation per day  (in hours)?",
      unit: "Hr",
      type: "textField",
      answer: "",
    },
    {
      id: 20,
      icon: "images/timer.svg",
      question: "Average waiting time",
      description:
        "On average, what percentage of a shift's duration is spent on actual driving?",
      unit: "%",
      type: "textField",
      answer: "",
    },
    {
      id: 11,
      icon: "images/timer.svg",
      question: "Average waiting time",
      description:
        "On average, what percentage of a shift's duration is spent waiting for loading/unloding?",
      unit: "%",
      type: "textField",
      answer: "",
    },
    {
      id: 13,
      icon: "images/vector.svg",
      question: "Peak Period",
      description:
        "What is the maximum total tonnage moved by your fleet in a month (in tons)?",
      unit: "Ton",
      type: "textField",
      answer: "",
    },
    {
      id: 12,
      icon: "images/vector.svg",
      question: "Peak Period",
      description:
        "What is the maximum number of TEUs (Twenty-Foot Equivalent Units) moved by your fleet in a month?",
      unit: "",
      type: "textField",
      answer: "",
    },
    {
      id: 12,
      icon: "images/vector.svg",
      question: "Peak Period",
      description:
        "What is the maximum number of trailers or swap bodies moved by your fleet in a month?",
      unit: "",
      type: "textField",
      answer: "",
    },
    {
      id : 24,
      icon: "images/dollar.svg",
      question: "Your current OPEX cost",
      description: "what is current purchased electricity cost ($/kWh)",
      unit: "$/kWh",
      type: "textField",
      answer: "",
    },
    {
      id: 14,
      icon: "images/dollar.svg",
      question: "Your current OPEX cost",
      description:
        "What is the current diesel cost for your fleet in dollars per year ($/year)?",
      unit: "$/year",
      type: "textField",
      answer: "",
    },

    {
      id: 23,
      icon: "images/dollar.svg",
      question: "Your current OPEX cost",
      description:
        "What is current consumption of your diesel tractor per hour?",
      type: "textField",
      answer: "",
    },
    {
      id: 16,
      icon: "images/dollar.svg",
      question: "Your current OPEX cost",
      description:
        "What is the annual maintenance cost per diesel tractor in dollars per year ($/year)?",
      unit: "$/yr",
      type: "textField",
      answer: "",
    },
    {
      id: 15,
      icon: "images/dollar.svg",
      question: "Your current OPEX cost",
      description:
        "How many hours of maintenance downtime does each diesel tractor experience per year (in hours)?",
      unit: "Hr",
      type: "textField",
      answer: "",
    },
    {
      id: 17,
      icon: "images/tractor.svg",
      question: "Existing Diesel Tractor Brand",
      description:
        "Please provide the brand name of your existing diesel tractors.",
      type: "textField",
      hint: "Type here",
      answer: "",
    },

  ],
};

export const QuestionContext = createContext(initialData);

export const QuestionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialData);

  // Actions for changing state

  function setAnswer(item) {
    dispatch({
      type: "SET_ANSWER",
      payload: item,
    });
  }

  return (
    <QuestionContext.Provider
      value={{
        questions: state.data,
        setAnswer,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
