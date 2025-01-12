"use client";


import SkillsInfo from "@/components/SkillsInfo";
import UserInfo from "@/components/UserInfo";
import SparklesText from "@/components/ui/sparkles-text";
import { MarqueeDemo } from "@/components/ui/Footer";
import Navbar from "@/components/Navbar";
import ModeToggle from "@/components/mode-toggle";
import ApexProgressLineChart from "@/components/graphs/RechartProgressLineChart";
import SucessFailureRadialStackedChart from "@/components/graphs/SucessFailureRadialStackedChart";
import SkillsPieChart from "@/components/graphs/SkillsPieChart";
import LevelGrandBarChart from "@/components/graphs/LevelGrandBarChart";



export default function Home() {
  return (
    <>

     <main className="grid grid-cols-1 gap-4 p-4 items-center justify-items-center w-full ">
      <Navbar />
  
        <div className="px-4 py-8">
          <SparklesText text="😎Welcome, Visionary" />
          <SparklesText text="Full-Stack Engineer!😎" />
        
        </div>
        <div>
        <div >
          <UserInfo />
        </div>
        {/* graphs section */}
        <div className="container grid grid-cols-1 gap-10">
          <SkillsInfo />
         <ApexProgressLineChart />
         <SucessFailureRadialStackedChart />
         <SkillsPieChart />
         <LevelGrandBarChart />
       
        </div>
        </div>
      </main>
      <div className="w-full overflow-hidden">
        <MarqueeDemo />
      </div>
    </>
  );
}
