import Baselayout from "@/components/Baselayout/baselayout";

import ExitPage from "@/components/Exit/exitPage";
import React from "react";

export default function index() {
  const handleClick = () => {
    window.location.href = "/";
  };
  return (
    <Baselayout  hideDiv={true} hideGrayButton={true} blackClick={handleClick} mainText={"Done"} text={"Done"} handleClick={handleClick} customWidth={"100%"}>
      <ExitPage />
    </Baselayout>
  );
}
