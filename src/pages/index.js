import { Inter } from "next/font/google";
import Baselayout from "@/components/Baselayout/baselayout";
import Electricity from "@/components/Home.js/home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleClick = () => {
    window.location.href = "/questions";
  };

  return (
    <Baselayout hideDiv={true} text={"Start"} mainText={"Start"} blackClick={handleClick} hideGrayButton={true} handleClick={handleClick}>
      <Electricity />
    </Baselayout>
  );
}
