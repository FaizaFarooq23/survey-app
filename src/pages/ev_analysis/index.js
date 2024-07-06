import Baselayout from '@/components/Baselayout/baselayout'
import EVAnalysis from '@/components/EVAnalysis/evAnalysis'
import { QuestionContext } from "@/context/GlobalProvider";
import { useRouter } from "next/router";
import React, { useContext, useState } from 'react'

export default function index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const router = useRouter();
  const { questions } = useContext(QuestionContext);
  const sendEmail = () => {
    try{
    fetch("/api/make_doc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...questions, email: email, name: name}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    router.push("/exit");
    }
    catch(err){
      console.log(err)
    }
  };
  const  handleClick = () => {
    // if current router is /ev_analysis, then go to /exit
    if (router.pathname === "/ev_analysis") {
      sendEmail();
    }
    window.location.href = '/exit'
  }
const handlePrePage = () => {
  window.location.href = '/'
}
  return (
    <Baselayout  mainText={"Next"} blackClick={sendEmail} text={"Next"} handleClick={handleClick} hideGrayButton={true} customWidth={"95%"} grayClick={handlePrePage}>
    <EVAnalysis handleEmailChange={handleEmailChange} handleNameChange={handleNameChange} name={name} email={email} />
    </Baselayout>
  )
}
