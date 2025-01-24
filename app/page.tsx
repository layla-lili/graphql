"use client";
import UserInfo from "@/components/UserInfo";
import SparklesText from "@/components/ui/sparkles-text";
import { MarqueeDemo } from "@/components/ui/Footer";
import Navbar from "@/components/Navbar";

import RechartProgressLineChart from "@/components/graphs/RechartProgressLineChart";
import SucessFailureRadialStackedChart from "@/components/graphs/SucessFailureRadialStackedChart";
import SkillsPieChart from "@/components/graphs/SkillsPieChart";
import { decodeJwt } from "@/app/ApolloWrapper";
import Cookies from 'js-cookie';

export default function Home() {
  const token = Cookies.get('JWT'); // Get token from cookies
  const decodedToken = token ? decodeJwt(token) : null;
  const userId = decodedToken ? decodedToken["sub"] : null;


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
          <UserInfo userId={userId} />
        </div>
        {/* graphs section */}
        <div className="container grid grid-cols-1 gap-10">
       
         <SkillsPieChart  />
         {/* <SkillsInfo  /> */}
         <SucessFailureRadialStackedChart auditorId={userId} /> 
          <RechartProgressLineChart  />
        
       
        </div>
        </div>
      </main>
      <div className="w-full overflow-hidden">
        <MarqueeDemo />
      </div>
    </>
  );
}
